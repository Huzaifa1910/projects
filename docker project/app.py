import mysql.connector
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from datetime import timedelta
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import pandas as pd

driver = webdriver.Chrome()
driver.maximize_window()
url = 'https://www.qlik.com/us/partners/find-a-partner'
driver.get(url)
time.sleep(5)
select = Select(driver.find_element(By.ID, "zl_countryCode"))
select.select_by_value(country_code)
time.sleep(5)
button = driver.find_element(By.ID, 'zl_show-more-btn')
while True:
    time.sleep(2)
    button.click()
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "zl_show-more-btn")))
    div = driver.find_element(By.ID, "zl_show-more")
    if div.value_of_css_property("display") == "none":
        print("done Scrapping")
        break
page_source = driver.page_source
print(page_source)
# ti.xcom_push(key='page_source', value=page_source)
driver.quit()
