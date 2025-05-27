<?php
/**
 * Health Check Script for Plesk Environment
 * Use this to verify your setup is working correctly
 */

// Prevent direct access without proper setup
if (!file_exists('config/plesk-config.php') || !file_exists('config/database-config.php')) {
    die('Configuration files not found. Please ensure setup is complete.');
}

require_once 'config/plesk-config.php';
require_once 'config/database-config.php';

header('Content-Type: application/json');

$health_check = [
    'timestamp' => date('c'),
    'status' => 'healthy',
    'checks' => [],
    'environment' => 'plesk',
    'version' => '1.0.0'
];

// Check PHP version
$php_version = phpversion();
$health_check['checks']['php_version'] = [
    'status' => version_compare($php_version, '7.4.0', '>=') ? 'pass' : 'fail',
    'message' => "PHP version: $php_version",
    'required' => '7.4.0+'
];

// Check required PHP extensions
$required_extensions = ['pdo', 'pdo_mysql', 'mbstring', 'openssl', 'curl', 'json'];
foreach ($required_extensions as $ext) {
    $health_check['checks']['extension_' . $ext] = [
        'status' => extension_loaded($ext) ? 'pass' : 'fail',
        'message' => "Extension $ext: " . (extension_loaded($ext) ? 'loaded' : 'missing')
    ];
}

// Check database connection
try {
    $db = connectToDatabase();
    $health_check['checks']['database'] = [
        'status' => $db ? 'pass' : 'fail',
        'message' => $db ? 'Database connection successful' : 'Database connection failed'
    ];
} catch (Exception $e) {
    $health_check['checks']['database'] = [
        'status' => 'fail',
        'message' => 'Database connection error: ' . $e->getMessage()
    ];
}

// Check directory permissions
$directories = [
    'logs' => PLESK_LOGS_DIR,
    'tmp' => PLESK_TMP_DIR,
    'cache' => PLESK_CACHE_PATH
];

foreach ($directories as $name => $path) {
    $exists = is_dir($path);
    $writable = $exists ? is_writable($path) : false;
    
    $health_check['checks']['directory_' . $name] = [
        'status' => ($exists && $writable) ? 'pass' : 'fail',
        'message' => "Directory $name: " . ($exists ? 'exists' : 'missing') . 
                    ($exists ? ($writable ? ', writable' : ', not writable') : ''),
        'path' => $path
    ];
}

// Check .htaccess
$htaccess_exists = file_exists('.htaccess');
$health_check['checks']['htaccess'] = [
    'status' => $htaccess_exists ? 'pass' : 'warn',
    'message' => '.htaccess file: ' . ($htaccess_exists ? 'exists' : 'missing')
];

// Check SSL/HTTPS
$is_https = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on';
$health_check['checks']['ssl'] = [
    'status' => $is_https ? 'pass' : 'warn',
    'message' => 'HTTPS: ' . ($is_https ? 'enabled' : 'disabled')
];

// Overall status
$failed_checks = array_filter($health_check['checks'], function($check) {
    return $check['status'] === 'fail';
});

if (count($failed_checks) > 0) {
    $health_check['status'] = 'unhealthy';
    http_response_code(503);
} else {
    $warning_checks = array_filter($health_check['checks'], function($check) {
        return $check['status'] === 'warn';
    });
    
    if (count($warning_checks) > 0) {
        $health_check['status'] = 'degraded';
    }
}

echo json_encode($health_check, JSON_PRETTY_PRINT);
?>
