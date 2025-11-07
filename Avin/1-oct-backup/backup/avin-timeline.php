<?php
/**
 * Plugin Name: AVIN Timeline
 * Description: Scroll-based timeline with car animation
 * Version: 1.0
 * Author: Your Name
 */

if ( ! defined( 'ABSPATH' ) ) exit; // No direct access

// Enqueue CSS & JS
function avin_timeline_enqueue_assets() {
    $plugin_url = plugin_dir_url( __FILE__ );
    wp_enqueue_style( 'avin-timeline', $plugin_url . 'assets/css/timeline.css', array(), '1.0' );
    wp_enqueue_script( 'avin-timeline', $plugin_url . 'assets/js/timeline.js', array(), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'avin_timeline_enqueue_assets' );

// Shortcode
function avin_timeline_shortcode() {
    $template = plugin_dir_path( __FILE__ ) . 'timeline-template.php';
    if ( file_exists( $template ) ) {
        $content = file_get_contents( $template );
        $plugin_url = plugin_dir_url( __FILE__ );
        // Replace placeholder with correct URL
        $content = str_replace('{{PLUGIN_URL}}', $plugin_url, $content);
        return $content;
    }
    return '<p>Timeline template not found.</p>';
}

add_shortcode( 'timeline_scroll', 'avin_timeline_shortcode' );
