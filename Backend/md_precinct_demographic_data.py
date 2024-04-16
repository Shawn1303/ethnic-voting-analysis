import os
import pprint
import pandas as pd
import numpy as np
import json

'''
Precinct-Level (VTD) Demographic Data for registered voters
There are 23 counties and one independent city (24 total) in the U.S. state of Maryland. 
'''
df=pd.read_csv(r'Data\MD_L2_2020VTDAgg\MD_l2_2020vtd_agg_20210902.csv')

all_counties_fips_md = np.unique(df['COUNTYFP'])
assert len(all_counties_fips_md) == 24

'''
COUNTYFP   		3-digit Census 2020 County FIPS code
VTD   			6-digit Census 2020 VTD code
eth1_eur  - European
eth1_hisp - Hispanic and Portuguese
eth1_aa   - Likely African-American
eth1_esa  - East and South Asian
eth1_oth  - Other
'''

columns=["COUNTYFP","VTD","eth1_eur","eth1_hisp","eth1_aa","eth1_esa","eth1_oth"]

for county in all_counties_fips_md:
  county_df = df[df['COUNTYFP']==county]
  print(county_df[columns])

print(df.shape)

