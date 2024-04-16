import json
import os
import numpy as np
import pandas as pd
import pprint
df = pd.read_csv("Data/Virginia_Election_Results_Raw.csv")
pd.set_option('display.max_rows', None)

# filter by election type - House of Delegates
df = df[df["OfficeTitle"].str.contains("House of Delegates")]
assert len(df['OfficeTitle'].unique()) == 100 # check 100 districts

all_districts = df["OfficeTitle"].unique()
# sampleCols = ['CandidateName','TOTAL_VOTES','LocalityCode','PrecinctId']

cols=["CandidateName","Party","LocalityCode","PrecinctId","TOTAL_VOTES"]

all_counties=np.unique(df['LocalityCode'])

result_json={}

'''
aggregate precinct level vote casts for democratic/republican parties (ignoring complexities of which
house district the enacted plan a given precinct belonged to (further analysis for this can be done
if needed))
'''
for county in all_counties:
  county_df=df[df['LocalityCode']==county]
  all_precincts=np.unique(county_df['PrecinctId'])
  for precinct in all_precincts:
    # use -1 to denote provisional
    unique_id=(int(county),int(precinct) if precinct.isdigit() else -1) # precinct identifier
    precinct_df=county_df[county_df['PrecinctId']==precinct]

    '''testing'''
    district_ids=[]
    '''end testing'''

    total_dem_votes=0
    total_rep_votes=0
    total_other=0
    for ind,row in precinct_df.iterrows():
      if row['Party'] == "Democratic":
        # print("Democratic:: ",row[cols])
        total_dem_votes += row['TOTAL_VOTES']
      elif row['Party'] == "Republican":
        # print("republican::",row[cols])
        total_rep_votes += row['TOTAL_VOTES']
      else:
        total_other += row['TOTAL_VOTES']
      precinct_name=row['PrecinctName']

      '''testing'''
      if row['DistrictId'] not in district_ids:
        district_ids.append(row['DistrictId'])
      '''end testing'''
    # print("district id ",unique_id,district_ids)
    # print("Precinct {} has total_dem: {} total_rep: {}".format(unique_id,total_dem_votes,total_rep_votes))
    # write to result
    result_json[str(unique_id)] = {
      "precinct_name": precinct_name,
      "district_id": district_ids[0], # handle duplicate entries later
      "votes_for_dem_cand": total_dem_votes,
      "votes_for_rep_cand": total_rep_votes,
      "votes_for_other_cand":total_other,
      "votes_total": total_dem_votes + total_rep_votes + total_other
    }

pprint.pprint(result_json)

output_file=os.path.join("Data", "va_precinct_election_results.json")
if not os.path.exists(output_file):
  # Write the result_json dictionary to the JSON file
  with open(output_file, 'w') as json_file:
    json.dump(result_json, json_file, indent=4)
  print(f"Data has been saved to {output_file}")
else:
  print(f"File {output_file} already exists. Not overwriting.")




# old analysis below
# virginia_election_data = {}

# i = 0
# for district in all_districts: # each assembly district race
#   # get district number
#   virginia_election_data[district_num] = {}
#   district_df = df[df["OfficeTitle"]==district]
#   all_counties = district_df['LocalityName'].unique()
#   for county in all_counties:
#     virginia_election_data[district_num][county] = {}
#     county_df = district_df[district_df['LocalityName'] == county]
#     all_precincts = county_df['PrecinctId'].unique()
#     for precinct in all_precincts:
#       print("County: {} Precinct: {}".format(county,precinct))
#       '''
#       precinct_level_data = {'Precinct_Name': "", 'Election_Results': {}} # precinct specific data
#       precinct_df = county_df[county_df['PrecinctId'] == precinct]
#       precinct_name = ""
#       for index, row in precinct_df.iterrows():
#         # print(row['CandidateName'], row['TOTAL_VOTES'], row['PrecinctId'], row['LocalityName'],row['OfficeTitle'])
#         precinct_name = row['PrecinctName']
#         precinct_level_data['Election_Results'][row['CandidateName']] = row['TOTAL_VOTES']
#       precinct_level_data['Precinct_Name'] = precinct_name
#       virginia_election_data[district_num][county][precinct] = precinct_level_data
#       '''
#   print("======================================================================")

#   i+=1
#   if i == 5:
#     break

# pprint.pprint(virginia_election_data)


# with open('Data/virginia_election_data.json', 'w') as json_file:
#     json.dump(virginia_election_data, json_file, indent=4)