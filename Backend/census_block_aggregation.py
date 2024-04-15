import pandas as pd
import numpy as np
df = pd.read_csv(r'Data\VA_L2_2020VTDAgg\VA_l2_2020vtd_agg_20210902.csv')

'''
Race data on precinct/voting-district level for registered voters
in State of Virginia
''' 

'''
counties are identified by FIPS code, virginia mapping can be found
here - https://simple.wikipedia.org/wiki/List_of_counties_in_Virginia
(95 counties and 39 independent cities in VA)

Columns:
eth1_eur  - European
eth1_hisp - Hispanic and Portuguese
eth1_aa   - Likely African-American
eth1_esa  - East and South Asian
eth1_oth  - Other
'''
# print(df[['COUNTYFP','VTD']])
# print(df.columns)

all_counties_fips_va = np.unique(df['COUNTYFP'])
# print("The unique VA County FIPS Codes: ",len(all_counties_fips_va),'\n',all_counties_fips_va)

race_columns = ["eth1_eur", "eth1_hisp", "eth1_aa", "eth1_esa", "eth1_oth"]

for fip_code in all_counties_fips_va:
  print()
  county_df = df[df['COUNTYFP']==fip_code]
  columns_of_interest = ['COUNTYFP','VTD']+race_columns
  print(county_df[columns_of_interest])