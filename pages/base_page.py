import selenium.webdriver.support.ui as WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
import logging
from utils.config import EXPLICIT_WAIT, SCREENSHOTS_DIR

logger = logging.getLogger(__name__)


def log(message):
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {message}")
    logger.info(message)


class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, EXPLICIT_WAIT)

    def find_element(self, locator):
        element = self.wait.until(EC.presence_of_element_located(locator))
        return element

    def find_elements(self, locator):
        elements = self.wait.until(EC.presence_of_all_elements_located(locator))
        return elements

    def click(self, locator):
        element = self.find_element(locator)
        element.click()

    def send_keys(self, locator, text):
        element = self.find_element(locator)
        element.send_keys(text)

    def get_text(self, locator):
        element = self.find_element(locator)
        return element.text

    def get_attribute(self, locator, attribute):
        element = self.find_element(locator)
        return element.get_attribute(attribute)

    def get_value(self, locator):
        element = self.find_element(locator)
        return element.get_attribute('value')

    def get_values(self, locator):
        elements = self.find_elements(locator)
        return elements

    def get_locator(self, locator):
        element = self.find_element(locator)
        return element

    def get_locators(self, locator):
        elements = self.find_elements(locator)
        return elements

    def get_text_from_elements(self, locator):
        elements = self.find_elements(locator)
        return [element.text for element in elements]

    def get_attribute_from_elements(self, locator, attribute):
        elements = self.find_elements(locator)
        return [element.get_attribute(attribute) for element in elements]

    def get_value_from_elements(self, locator):
        elements = self.find_elements(locator)
        return [element.get_attribute('value') for element in elements] 

    def screenshot(self, name):
        self.driver.save_screenshot(f"{SCREENSHOTS_DIR}/{name}.png")
        return f"{SCREENSHOTS_DIR}/{name}.png"

    def get_current_url(self):
        return self.driver.current_url

    def get_title(self):
        return self.driver.title

