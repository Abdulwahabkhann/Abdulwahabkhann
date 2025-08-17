import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        time.sleep(15) # Wait for Vercel to wake up
        page.goto("https://sidra-lij4bchnx-abdulwahabs-projects-7bbef83b.vercel.app")
        # Wait for the page to load, specifically for the hero heading
        page.wait_for_selector('h1:has-text("Slide 1: Welcome to SIDRA Hub")')
        # Give it a little extra time for the chart and data to load
        time.sleep(5)
        page.screenshot(path="jules-scratch/verification/sidra-hub-screenshot.png")
        browser.close()

run()
