import json
import pandas as pd
import pprint
df = pd.read_csv("Data/Virginia_Election_Results_Raw.csv")
pd.set_option('display.max_rows', None)

# filter by election type - House of Delegates
df = df[df["OfficeTitle"].str.contains("House of Delegates")]
assert len(df['OfficeTitle'].unique()) == 100 # check 100 districts

all_districts = df["OfficeTitle"].unique()
sampleCols = ['CandidateName','TOTAL_VOTES','PrecinctId','LocalityName','OfficeTitle']

virginia_election_data = {}

i = 0
for district in all_districts: # each assembly district race
  print(f"District ----------- {district}")
  # get district number
  district_num = ''.join([char for char in district if char.isdigit()])
  virginia_election_data[district_num] = {}
  district_df = df[df["OfficeTitle"]==district]
  all_counties = district_df['LocalityName'].unique()
  for county in all_counties:
    virginia_election_data[district_num][county] = {}
    county_df = district_df[district_df['LocalityName'] == county]
    all_precincts = county_df['PrecinctId'].unique()
    for precinct in all_precincts:
      precinct_level_data = {'Precinct_Name': "", 'Election_Results': {}} # precinct specific data
      precinct_df = county_df[county_df['PrecinctId'] == precinct]
      precinct_name = ""
      for index, row in precinct_df.iterrows():
        # print(row['CandidateName'], row['TOTAL_VOTES'], row['PrecinctId'], row['LocalityName'],row['OfficeTitle'])
        precinct_name = row['PrecinctName']
        precinct_level_data['Election_Results'][row['CandidateName']] = row['TOTAL_VOTES']
      precinct_level_data['Precinct_Name'] = precinct_name
      virginia_election_data[district_num][county][precinct] = precinct_level_data
  print("======================================================================")

  # i+=1
  # if i == 5:
  #   break

pprint.pprint(virginia_election_data)
# with open('Data/virginia_election_data.json', 'w') as json_file:
#     json.dump(virginia_election_data, json_file, indent=4)