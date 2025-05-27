<?php
/**
 * Plesk-Specific Configuration
 * Optimized for Plesk hosting environment
 */

// Prevent direct access
if (!defined('PLESK_ENV')) {
    exit('Direct access not permitted');
}

// Plesk-specific settings
$plesk_config = [
    // Domain configuration
    'domain' => [
        'primary_domain' => $_SERVER['HTTP_HOST'] ?? 'localhost',
        'www_redirect' => true,
        'force_https' => true,
    ],
    
    // File permissions for Plesk
    'permissions' => [
        'file_mode' => 0644,
        'dir_mode' => 0755,
        'executable_mode' => 0755,
    ],
    
    // Plesk directory structure
    'directories' => [
        'vhosts' => '/var/www/vhosts',
        'httpdocs' => DOCUMENT_ROOT,
        'private' => dirname(DOCUMENT_ROOT) . '/private',
        'logs' => dirname(DOCUMENT_ROOT) . '/logs',
        'tmp' => dirname(DOCUMENT_ROOT) . '/tmp',
        'cgi_bin' => dirname(DOCUMENT_ROOT) . '/cgi-bin',
        'conf' => dirname(DOCUMENT_ROOT) . '/conf',
    ],
    
    // Security settings
    'security' => [
        'disable_functions' => [
            'exec', 'passthru', 'shell_exec', 'system', 'proc_open', 
            'popen', 'curl_exec', 'curl_multi_exec', 'parse_ini_file',
            'show_source'
        ],
        'hide_php_version' => true,
        'session_security' => true,
    ],
    
    // PHP settings optimization for Plesk
    'php_settings' => [
        'memory_limit' => '256M',
        'max_execution_time' => 300,
        'max_input_time' => 300,
        'upload_max_filesize' => '50M',
        'post_max_size' => '50M',
        'max_file_uploads' => 20,
    ],
    
    // Logging configuration
    'logging' => [
        'error_log' => dirname(DOCUMENT_ROOT) . '/logs/php_errors.log',
        'access_log' => dirname(DOCUMENT_ROOT) . '/logs/access.log',
        'log_level' => 'warning', // debug, info, warning, error
    ],
    
    // Cache settings
    'cache' => [
        'enabled' => true,
        'type' => 'file', // file, redis, memcached
        'ttl' => 3600,
        'path' => dirname(DOCUMENT_ROOT) . '/tmp/cache',
    ],
    
    // Email configuration for Plesk
    'email' => [
        'smtp_host' => 'localhost',
        'smtp_port' => 587,
        'smtp_auth' => true,
        'smtp_secure' => 'tls',
        'from_email' => 'noreply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost'),
        'from_name' => 'Website',
    ],
];

// Apply PHP settings if not in CLI mode
if (php_sapi_name() !== 'cli') {
    foreach ($plesk_config['php_settings'] as $setting => $value) {
        if (ini_get($setting) != $value) {
            ini_set($setting, $value);
        }
    }
    
    // Security settings
    if ($plesk_config['security']['hide_php_version']) {
        header_remove('X-Powered-By');
    }
}

// Helper functions for Plesk environment
function getPleskconfigValue($key, $default = null) {
    global $plesk_config;
    $keys = explode('.', $key);
    $value = $plesk_config;
    
    foreach ($keys as $k) {
        if (isset($value[$k])) {
            $value = $value[$k];
        } else {
            return $default;
        }
    }
    
    return $value;
}

function createPleskconfigDirectory($path, $mode = 0755) {
    if (!is_dir($path)) {
        return mkdir($path, $mode, true);
    }
    return true;
}

function isPleskconfigWritable($path) {
    return is_writable($path);
}

// Create necessary directories
$required_dirs = [
    getPleskconfigValue('directories.logs'),
    getPleskconfigValue('directories.tmp'),
    getPleskconfigValue('cache.path'),
];

foreach ($required_dirs as $dir) {
    if ($dir && !createPleskconfigDirectory($dir)) {
        error_log("Failed to create directory: $dir");
    }
}

// Define global constants from config
define('PLESK_PRIMARY_DOMAIN', getPleskconfigValue('domain.primary_domain'));
define('PLESK_FORCE_HTTPS', getPleskconfigValue('domain.force_https'));
define('PLESK_LOGS_DIR', getPleskconfigValue('directories.logs'));
define('PLESK_TMP_DIR', getPleskconfigValue('directories.tmp'));
define('PLESK_CACHE_ENABLED', getPleskconfigValue('cache.enabled'));
define('PLESK_CACHE_PATH', getPleskconfigValue('cache.path'));

?>
