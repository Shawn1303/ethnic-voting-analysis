import json
import pprint
import geopandas as gpd
from matplotlib import pyplot as plt
import maup
import numpy as np
import pandas as pd

# election data and precinct geometries
file_path = "md_precinct_election_results.json"
gdf = gpd.read_file(file_path)

column_mapping = {
    'G20PRERTRU': 'republican_votes',
    'G20PREDBID': 'democratic_votes',
    'G20PRELJOR': 'liberation_votes',
    'G20PREGHAW': 'green_votes',
    'G20PREBSEG': 'bread_and_roses',
    'G20PREOWRI': 'write_in_votes'
}

gdf = gdf.rename(columns=column_mapping)
gdf['total_votes'] = gdf[['republican_votes', 
                          'democratic_votes', 
                          'liberation_votes', 
                          'green_votes',
                          'bread_and_roses',
                          'write_in_votes']].sum(axis=1)

# join with district geometries
districts = gpd.read_file("md_house_plan.json")

gdf = gdf.to_crs(gdf.estimate_utm_crs())
districts = districts.to_crs(districts.estimate_utm_crs())
assignments = maup.assign(gdf,districts)
gdf['district_id'] = assignments
print("done with assignments")


# join with demographic results
file = 'maryland_voter_demographics/MD_L2_2020VTDAgg/MD_l2_2020vtd_agg_20210902.csv'
voter_demographics_df = pd.read_csv(file)
# print(voter_demographics_df.head())


cols = ["GEOID","COUNTYFP","VTD","eth1_eur","eth1_hisp","eth1_aa","eth1_esa","eth1_oth","eth1_unk"]
voter_demographics_df = voter_demographics_df[cols]

'''
    'registered_voters_european'
    'registered_voters_hispanic'
    'registered_voters_african_american'
    'registered_voters_south_east_asian'
    'registered_voters_other'
    'registered_voters_unknown'
    'registered_voters_total'
'''

column_mapping = {
    "eth1_eur":'registered_voters_european',
    "eth1_hisp":'registered_voters_hispanic',
    "eth1_aa":'registered_voters_african_american',
    "eth1_esa":'registered_voters_south_east_asian',
    "eth1_oth":'registered_voters_other',
    "eth1_unk":'registered_voters_unknown'
}

voter_demographics_df = voter_demographics_df.rename(columns=column_mapping)
print(voter_demographics_df[["COUNTYFP","VTD"]])

print(gdf.iloc[5])