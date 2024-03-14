# trying to scrape website

from bs4 import BeautifulSoup
import requests

URL = "https://ballotpedia.org/Virginia_House_of_Delegates"

page = requests.get(URL)
soup = BeautifulSoup(page.content,"html.parser")
reps_table = soup.find(id = "officeholder-table")
resultList = []
if reps_table:
  tbody = reps_table.find("tbody")
  if tbody:
    tr_els = tbody.find_all('tr')
    for tr_el in tr_els:
      row_data = tr_el.find_all('td')
      temp = []
      for d in row_data:
        temp.append(d.text)
      resultList.append(temp)

print(resultList)

with open("Data/VA_House_Of_Delegates","w") as f:
  for row in resultList:
    # Join the elements of the list with commas and write to the file
    f.write(','.join(row) + '\n')