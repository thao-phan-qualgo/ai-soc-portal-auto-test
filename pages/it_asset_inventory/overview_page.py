from pages.base_page import BasePage
from utils.config import configs

class OverviewPage(BasePage):
    """Overview page for IT Asset Inventory"""

    OVERVIEW_PAGE_URL = f"{configs.BASE_URL}/accounts/{configs.ACCOUNT_ID}/organizations/{configs.ORGANIZATION_ID}/overview"
    def __init__(self, driver):
        super().__init__(driver)

    def open(self):
        self.driver.get(self.OVERVIEW_PAGE_URL)
        print(f"Opened {self.OVERVIEW_PAGE_URL}")

   