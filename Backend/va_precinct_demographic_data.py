import os
import pprint
import pandas as pd
import numpy as np
import json

df = pd.read_csv(r'Data\VA_L2_2020VTDAgg\VA_l2_2020vtd_agg_20210902.csv')

'''
Precinct-Level (VTD) Demographic Data for registered voters
''' 

'''
counties are identified by FIPS code, virginia mapping can be found
here - https://simple.wikipedia.org/wiki/List_of_counties_in_Virginia
(95 counties and 38 independent cities in VA) = total 133

Columns:
eth1_eur  - European
eth1_hisp - Hispanic and Portuguese
eth1_aa   - Likely African-American
eth1_esa  - East and South Asian
eth1_oth  - Other
'''

all_counties_fips_va = np.unique(df['COUNTYFP'])
# print("The unique VA County FIPS Codes: ",len(all_counties_fips_va),'\n',all_counties_fips_va)



race_columns = ["eth1_eur", "eth1_hisp", "eth1_aa", "eth1_esa", "eth1_oth"]

va_demographics_data={}

for fip_code in all_counties_fips_va:
  county_df = df[df['COUNTYFP']==fip_code]
  columns_of_interest = ['COUNTYFP','VTD']+race_columns
  
  for _,precinct in county_df.iterrows():
    temp=precinct[columns_of_interest]
    county_id=temp['COUNTYFP']
    vtd=temp['VTD']
    precinct_identifier=(county_id,vtd)
    # print(precinct_identifier)
    
    demographics={
      "European": int(temp['eth1_eur']),
      "Hispanic": int(temp['eth1_hisp']),
      "AfricanAmerican": int(temp['eth1_aa']),
      "SouthEastAsian": int(temp['eth1_esa']),
      "Other":int(temp['eth1_oth'])
    }
    
    # add to result
    va_demographics_data[str(precinct_identifier)] = demographics

# pprint.pprint(va_demographics_data)
assert df.shape[0] == len(va_demographics_data) # check num precincts = 2463 total for va
# print(len(va_demographics_data), " total num precincts detected")

json_file_path = "va_demographics_data.json"
# Check if the JSON file already exists
if not os.path.exists(json_file_path):
    # Write the dictionary to the JSON file
    with open(json_file_path, "w") as json_file:
      json.dump(va_demographics_data,json_file,indent=4)
    print("Data has been successfully written to", json_file_path)
else:
    print("JSON file already exists. Data will not be overwritten.")
