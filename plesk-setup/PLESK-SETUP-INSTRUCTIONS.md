# Plesk Server Setup Instructions

## Overview
This guide provides comprehensive instructions for setting up your web application in a Plesk hosting environment. Follow these steps to ensure proper configuration and optimal performance.

## Prerequisites
- Active Plesk hosting account
- Access to Plesk control panel
- FTP/SFTP access or File Manager access
- Database access through Plesk

## Step 1: Domain and Hosting Setup

### 1.1 Domain Configuration
1. Log into your Plesk control panel
2. Go to **Websites & Domains**
3. Add your domain or select existing domain
4. Ensure the document root points to `httpdocs` directory

### 1.2 SSL Certificate (Recommended)
1. Navigate to **SSL/TLS Certificates**
2. Install SSL certificate (Let's Encrypt is free option)
3. Enable "Redirect from HTTP to HTTPS"
4. Update force_https setting in `config/plesk-config.php`

## Step 2: File Upload and Directory Structure

### 2.1 Upload Files
Upload all files from the `plesk-setup` directory to your domain's `httpdocs` folder:

\`\`\`
httpdocs/
├── index.php
├── config/
│   ├── plesk-config.php
│   └── database-config.php
├── .htaccess
└── [your application files]
\`\`\`

### 2.2 Set File Permissions
\`\`\`bash
# For files
chmod 644 *.php
chmod 644 config/*.php
chmod 644 .htaccess

# For directories
chmod 755 config/
chmod 755 logs/
chmod 755 tmp/
\`\`\`

## Step 3: Database Configuration

### 3.1 Create Database
1. In Plesk, go to **Databases**
2. Click **Add Database**
3. Enter database name, username, and password
4. Note the connection details

### 3.2 Update Database Configuration
Edit `config/database-config.php` with your database details:

\`\`\`php
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASSWORD', 'your_database_password');
\`\`\`

### 3.3 Initialize Database
Access your domain in browser - the index.php will attempt to create necessary tables automatically.

## Step 4: PHP Configuration

### 4.1 PHP Version
1. In Plesk, go to **PHP Settings**
2. Select PHP 7.4 or higher (recommended: PHP 8.1+)
3. Enable required extensions:
   - PDO
   - PDO_MySQL
   - mbstring
   - openssl
   - curl
   - json
   - zip

### 4.2 PHP Settings Optimization
Configure these settings in Plesk PHP Settings:

\`\`\`
memory_limit = 256M
max_execution_time = 300
max_input_time = 300
upload_max_filesize = 50M
post_max_size = 50M
max_file_uploads = 20
\`\`\`

## Step 5: Security Configuration

### 5.1 Directory Protection
Ensure these directories are not web-accessible:
- `../private/` (outside document root)
- `../logs/` (outside document root)
- `../tmp/` (outside document root)

### 5.2 File Protection
The included `.htaccess` file protects:
- Configuration files
- Log files
- Hidden files (starting with .)
- Git repositories

### 5.3 Security Headers
Security headers are automatically set via `.htaccess` and PHP configuration.

## Step 6: Testing and Verification

### 6.1 Access Your Site
1. Visit your domain in browser
2. Verify the Plesk environment is detected
3. Check database connection status
4. Review server information display

### 6.2 Error Checking
- Check PHP error logs in `../logs/php_errors.log`
- Review Plesk control panel for any errors
- Test all functionality

## Step 7: Optimization and Maintenance

### 7.1 Performance Optimization
1. Enable **Apache & nginx Settings** in Plesk
2. Configure caching in `config/plesk-config.php`
3. Optimize images and static files
4. Enable compression via `.htaccess`

### 7.2 Backup Configuration
1. Set up regular backups in Plesk
2. Include database in backup
3. Store configuration files securely

### 7.3 Monitoring
- Monitor disk space usage
- Check database performance
- Review error logs regularly
- Monitor website performance

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed
- Verify database credentials in `config/database-config.php`
- Check database server status in Plesk
- Ensure database user has proper permissions

#### 2. File Permission Errors
\`\`\`bash
# Reset permissions
find httpdocs/ -type f -exec chmod 644 {} \;
find httpdocs/ -type d -exec chmod 755 {} \;
\`\`\`

#### 3. .htaccess Errors
- Check Apache error logs in Plesk
- Verify mod_rewrite is enabled
- Test .htaccess rules one by one

#### 4. PHP Errors
- Check PHP error logs
- Verify PHP version compatibility
- Ensure required PHP extensions are installed

### Getting Help
1. Check Plesk documentation
2. Review hosting provider support
3. Check PHP and Apache error logs
4. Contact technical support if needed

## Security Best Practices

1. **Regular Updates**
   - Keep PHP version updated
   - Update application regularly
   - Monitor security patches

2. **Access Control**
   - Use strong passwords
   - Enable two-factor authentication
   - Limit FTP/SSH access

3. **Backup Strategy**
   - Regular automated backups
   - Test backup restoration
   - Store backups securely

4. **Monitoring**
   - Monitor failed login attempts
   - Check for suspicious activity
   - Review access logs regularly

## Next Steps

After successful setup:
1. Deploy your actual application
2. Configure email settings if needed
3. Set up monitoring and analytics
4. Configure CDN if required
5. Implement additional security measures

## Support

For additional support:
- Plesk documentation: https://docs.plesk.com/
- PHP documentation: https://php.net/docs.php
- Your hosting provider's support team
