<?php
/**
 * Plesk-Optimized Index File
 * Designed for Plesk web hosting environment
 * Compatible with Plesk server configurations and directory structures
 */

// Enable error reporting for development (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Plesk-specific configuration
define('PLESK_ENV', true);
define('DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT']);
define('DOMAIN_NAME', $_SERVER['HTTP_HOST']);

// Define common Plesk directory paths
define('PLESK_VHOSTS_DIR', '/var/www/vhosts/');
define('HTTPDOCS_DIR', DOCUMENT_ROOT);
define('PRIVATE_DIR', dirname(DOCUMENT_ROOT) . '/private');
define('LOGS_DIR', dirname(DOCUMENT_ROOT) . '/logs');
define('TMP_DIR', dirname(DOCUMENT_ROOT) . '/tmp');

// Include configuration files
require_once 'config/plesk-config.php';
require_once 'config/database-config.php';

// Auto-detect Plesk environment
function detectPleskEnvironment() {
    $indicators = [
        'PLESK_DIR' => '/usr/local/psa',
        'PLESK_BIN' => '/usr/local/psa/bin',
        'PLESK_ADMIN' => '/usr/local/psa/admin'
    ];
    
    foreach ($indicators as $name => $path) {
        if (is_dir($path)) {
            define($name, $path);
            return true;
        }
    }
    return false;
}

// Initialize Plesk environment
$isPleskEnvironment = detectPleskEnvironment();

// Database connection function for Plesk
function connectToDatabase() {
    try {
        $host = DB_HOST;
        $dbname = DB_NAME;
        $username = DB_USER;
        $password = DB_PASSWORD;
        
        $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        
        $pdo = new PDO($dsn, $username, $password, $options);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return false;
    }
}

// Security headers for Plesk environment
function setSecurityHeaders() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    
    // Only add HSTS if HTTPS is enabled
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
        header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
    }
}

// Initialize application
function initializeApplication() {
    // Set timezone (adjust as needed)
    date_default_timezone_set('UTC');
    
    // Start session with secure settings
    if (!session_id()) {
        session_start([
            'cookie_httponly' => true,
            'cookie_secure' => isset($_SERVER['HTTPS']),
            'cookie_samesite' => 'Strict'
        ]);
    }
    
    // Initialize logging
    ini_set('log_errors', 1);
    ini_set('error_log', LOGS_DIR . '/php_errors.log');
}

// Main application logic
try {
    // Set security headers
    setSecurityHeaders();
    
    // Initialize application
    initializeApplication();
    
    // Test database connection
    $db = connectToDatabase();
    $dbStatus = $db ? 'Connected' : 'Failed';
    
    // Get server information
    $serverInfo = [
        'PHP Version' => phpversion(),
        'Server Software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
        'Document Root' => DOCUMENT_ROOT,
        'Domain' => DOMAIN_NAME,
        'Plesk Environment' => $isPleskEnvironment ? 'Detected' : 'Not Detected',
        'Database Status' => $dbStatus,
        'HTTPS' => isset($_SERVER['HTTPS']) ? 'Enabled' : 'Disabled',
        'Memory Limit' => ini_get('memory_limit'),
        'Max Execution Time' => ini_get('max_execution_time') . 's',
        'Upload Max Size' => ini_get('upload_max_filesize'),
        'Post Max Size' => ini_get('post_max_size')
    ];
    
} catch (Exception $e) {
    error_log("Application initialization error: " . $e->getMessage());
    $serverInfo['Error'] = $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plesk Environment - <?php echo htmlspecialchars(DOMAIN_NAME); ?></title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section h2 {
            color: #2c3e50;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #3498db;
            font-size: 1.5rem;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .info-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            border-left: 4px solid #3498db;
        }
        
        .info-card h3 {
            color: #2c3e50;
            margin-bottom: 15px;
        }
        
        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        
        .info-item:last-child {
            border-bottom: none;
        }
        
        .info-label {
            font-weight: 600;
            color: #555;
        }
        
        .info-value {
            color: #333;
            font-family: 'Courier New', monospace;
        }
        
        .status-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 8px;
        }
        
        .status-success {
            background-color: #27ae60;
        }
        
        .status-warning {
            background-color: #f39c12;
        }
        
        .status-error {
            background-color: #e74c3c;
        }
        
        .alert {
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
        
        .alert-success {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        
        .alert-warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
        }
        
        .alert-error {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            border-top: 1px solid #e9ecef;
        }
        
        @media (max-width: 768px) {
            .container {
                margin: 10px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .content {
                padding: 20px;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Plesk Environment Ready</h1>
            <p>Your web application is successfully configured for Plesk hosting</p>
        </div>
        
        <div class="content">
            <?php if ($isPleskEnvironment): ?>
                <div class="alert alert-success">
                    <strong>✅ Plesk Environment Detected!</strong> Your application is running in a Plesk-managed hosting environment.
                </div>
            <?php else: ?>
                <div class="alert alert-warning">
                    <strong>⚠️ Plesk Environment Not Detected.</strong> This may be a different hosting environment or local development setup.
                </div>
            <?php endif; ?>
            
            <div class="section">
                <h2>Server Information</h2>
                <div class="info-grid">
                    <div class="info-card">
                        <h3>System Details</h3>
                        <?php foreach ($serverInfo as $label => $value): ?>
                            <div class="info-item">
                                <span class="info-label"><?php echo htmlspecialchars($label); ?>:</span>
                                <span class="info-value">
                                    <?php if ($label === 'Database Status'): ?>
                                        <span class="status-indicator <?php echo $value === 'Connected' ? 'status-success' : 'status-error'; ?>"></span>
                                    <?php elseif ($label === 'Plesk Environment'): ?>
                                        <span class="status-indicator <?php echo $value === 'Detected' ? 'status-success' : 'status-warning'; ?>"></span>
                                    <?php elseif ($label === 'HTTPS'): ?>
                                        <span class="status-indicator <?php echo $value === 'Enabled' ? 'status-success' : 'status-warning'; ?>"></span>
                                    <?php endif; ?>
                                    <?php echo htmlspecialchars($value); ?>
                                </span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    
                    <div class="info-card">
                        <h3>Directory Structure</h3>
                        <div class="info-item">
                            <span class="info-label">Document Root:</span>
                            <span class="info-value"><?php echo htmlspecialchars(HTTPDOCS_DIR); ?></span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Private Directory:</span>
                            <span class="info-value"><?php echo htmlspecialchars(PRIVATE_DIR); ?></span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Logs Directory:</span>
                            <span class="info-value"><?php echo htmlspecialchars(LOGS_DIR); ?></span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Temp Directory:</span>
                            <span class="info-value"><?php echo htmlspecialchars(TMP_DIR); ?></span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2>Next Steps</h2>
                <div class="info-grid">
                    <div class="info-card">
                        <h3>Application Setup</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                📝 Configure your database settings in <code>config/database-config.php</code>
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                🔧 Customize Plesk-specific settings in <code>config/plesk-config.php</code>
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                🛡️ Review security configurations for production deployment
                            </li>
                            <li style="padding: 8px 0;">
                                🚀 Deploy your application files to the httpdocs directory
                            </li>
                        </ul>
                    </div>
                    
                    <div class="info-card">
                        <h3>Plesk Features</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                📊 Access Plesk control panel for domain management
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                📧 Configure email accounts and forwarding
                            </li>
                            <li style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                🔒 Set up SSL certificates for secure connections
                            </li>
                            <li style="padding: 8px 0;">
                                📈 Monitor website statistics and performance
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>&copy; <?php echo date('Y'); ?> - Plesk-Optimized Web Application | Generated at <?php echo date('Y-m-d H:i:s T'); ?></p>
        </div>
    </div>
</body>
</html>
