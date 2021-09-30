"""
Simple script to take screenshots of the EBM risk functions displayed on EBM-Java-UI.
"""
import shutil

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from PIL import Image
import os
import time
import re


def main():
    # Model URL to take screenshots of.
    address = "http://localhost:8080/EBM_Java_UI_war/validate?identifier=5467cbb4649851a05865ecb8fb22494d"
    # Target folder without trailing slash.
    target_path = "screenshots"

    driver = webdriver.Firefox()
    driver.get(address)
    driver.fullscreen_window()

    # Wait until plot selection is loaded.
    time.sleep(2)

    rescale(driver)
    take_screenshots(driver, target_path)


def rescale(driver):
    # Change some styles.
    driver.execute_script("document.getElementsByClassName('navbar')[0].style.display = 'none';")
    driver.execute_script("document.getElementsByClassName('container')[0].style.padding = '0';")
    driver.execute_script(
        "document.getElementsByClassName('card')[1].setAttribute('style', 'min-height: 99vh !important');")
    driver.execute_script("document.getElementsByClassName('card-header')[1].style.display = 'none';")
    driver.execute_script("document.getElementsByClassName('col-md-4')[0].style.position = 'absolute';")
    driver.execute_script("document.getElementsByClassName('col-md-4')[0].style.left = '-500px';")


def take_screenshots(driver, folder):
    # Create target folder.
    if os.path.exists(folder):
        shutil.rmtree(folder)
    os.mkdir(folder)

    plot_selection = driver.find_elements_by_class_name('plotselection')
    plot = driver.find_elements_by_class_name("card-body")[1]

    # Loop over plots to draw them with original size.
    for i in range(len(plot_selection)):
        current = driver.find_element_by_id("plots").get_attribute("innerHTML")
        plot_selection[i].click()

        # Wait until new plot is loaded.
        while driver.find_element_by_id("plots").get_attribute("innerHTML") == current:
            pass

    # Scale plots to 1.25.
    driver.execute_script("document.getElementsByClassName('card')[1].style.transform = 'scale(1.25)';")
    driver.execute_script("document.getElementsByClassName('card')[1].style.position = 'absolute';")
    driver.execute_script("document.getElementsByClassName('card')[1].style.top = '100px';")

    # Loop over plots and take screenshot.
    for i in range(len(plot_selection)):
        current = driver.find_element_by_id("plots").get_attribute("innerHTML")      

        plot_selection[i].click()
        
        # Wait until new plot is loaded.
        while driver.find_element_by_id("plots").get_attribute("innerHTML") == current:
            pass

        # Test if current plot is 1D or 2D by searching for canvas.
        try:   
            driver.find_element_by_css_selector("#plot"+plot_selection[i].get_attribute("id")+" canvas")
            plot_type = "2D"
        except NoSuchElementException:
            plot_type = "1D"

        name = str(i) + '_' +\
            plot_selection[i].find_element_by_css_selector("text").get_attribute("innerHTML").replace(" ", "_")
        name = re.sub(r"[^A-z0-9öäüÖÄÜ]+", "", name)

        location = plot.location
        size = plot.size

        driver.save_screenshot("shot.png")

        # Change img in px.
        if plot_type == "1D":
            move_down = 10
            move_right = 20

            crop_left = 0
            crop_right = 30
            crop_top = 0
            crop_bottom = 515
        elif plot_type == "2D":
            move_down = 10
            move_right = 20

            crop_left = 0
            crop_right = 30
            crop_top = 0
            crop_bottom = 385

        x = location['x'] + move_down + crop_top
        y = location['y'] + move_right + crop_left
        w = size['width']
        h = size['height']
        width = x + w - crop_right - crop_left
        height = y + h - crop_bottom - crop_top

        im = Image.open('shot.png')
        im = im.crop((int(x), int(y), int(width), int(height)))
        im.save(folder + '/' + name + '.png')

    os.remove('shot.png')

    driver.close()


if __name__ == '__main__':
    main()
