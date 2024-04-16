import copy
import json
import pprint
import re

'''
Aggregate Virginia Precinct Level
Election Results
Boundary Data
Demographic Data
'''

Virginia_Result_Data = None # boundary data
with open('Data/virginia_precinct_boundary_data.json', 'r') as file:
  Virginia_Result_Data = json.load(file)

VA_Demographic_Data = None
with open('Data/va_demographics_data.json','r') as file:
  VA_Demographic_Data=json.load(file)

# approach to aggregation - treat dictionaries as sets, and to join into result

# deep copy for comparison later
deep_copy_dem = copy.deepcopy(VA_Demographic_Data)
deep_copy_boundary = copy.deepcopy(Virginia_Result_Data) # to track (later check remaining)

# pprint.pprint(Virginia_Result_Data)

# join boundary data with demographic data
for obj in Virginia_Result_Data['features']:
  # obj['properties']["foobar"] = "foofoo"
  
  # geometry_type=obj['geometry']['type']
  # geometry_coords=obj['geometry']['coordinates']
  properties = obj['properties']
  county_fips_code_1 = int(properties['COUNTYFP20']) # county identifier
  vtd_id_1 = int(properties['VTDST20']) # vtd identifier
  vtd_name = properties['NAMELSAD20'] # name of vtd

  # match against demographic data
  for iden,dem_data in deep_copy_dem.items():
    match = re.findall(r'\((\d+),\s*(\d+)\)',iden)[0]
    county_fips_code_2, vtd_id_2 = int(match[0]),int(match[1])
    # print(county_fips_code_2,vtd_id_2)

    matchingPrecinct = (county_fips_code_1==county_fips_code_2) and \
      (vtd_id_1 == vtd_id_2)
    if matchingPrecinct:
      # add to aggregate result, remove from sets
      # print("Successful")
      obj['properties']['Demographic_Data'] = dem_data
      del VA_Demographic_Data[iden]

# pprint.pprint(Virginia_Result_Data)

count_has_demographic_info=0
count_missing_demographic_info=0
for item in Virginia_Result_Data['features']:
  props=item['properties']
  if 'Demographic_Data' in props:
    count_has_demographic_info+=1
  else:
    count_missing_demographic_info+=1
    # fill with NA
    item['properties']['Demographic_Data'] = {
      "European": None,
      "Hispanic": None,
      "AfricanAmerican": None,
      "SouthEastAsian": None,
      "Other": None,
      "Unknown": None,
      "Total": None
    }

print("Results from adding demographic information")
print("Successfully added: ",count_has_demographic_info)
print("Missing Total: ",count_missing_demographic_info)

# look at VA_Demographic_Data, VA_Precinct_Boundary_Data

print("After filling in missing dem data")
for item in Virginia_Result_Data['features']:
  props=item['properties']
  assert 'Demographic_Data' in props
print("Successful insertion of null values")




# merge Virginia_Result_Data with election results data
VA_Election_Results_Data = None
with open('Data/va_precinct_election_results.json','r') as file:
  VA_Election_Results_Data=json.load(file)

# for unique_id,election_results in election_results_deep_copy.items():
#   match = re.findall(r'\((\d+),\s*(\d+)\)',unique_id)
#   if len(match) == 0:
#     print("error detected with match",unique_id)
#     continue
#   match = match[0]
#   county_fips_code_1, vtd_id_1 = int(match[0]),int(match[1])
#   # print(county_fips_code_1,vtd_id_1)
#   # lookup precinct entry in 
#   key = str((county_fips_code_1,vtd_id_1))
#   precinct_entry = Virginia_Result_Data.get(key)
#   if precinct_entry:
#     print("found!!")
#     Virginia_Result_Data.get(key)['Election_Data'] = election_results
#     del VA_Election_Results_Data[unique_id]
#   else:
#     print("Precinct not found...",key)

for obj in Virginia_Result_Data['features']:
  # obj['properties']["foobar"] = "foofoo"
  # geometry_type=obj['geometry']['type']
  # geometry_coords=obj['geometry']['coordinates']
  properties = obj['properties']
  county_fips_code_1 = int(properties['COUNTYFP20']) # county identifier
  vtd_id_1 = int(properties['VTDST20']) # vtd identifier
  vtd_name = properties['NAMELSAD20'] # name of vtd

  # match with election results data
  key = str((county_fips_code_1, vtd_id_1))
  if key in VA_Election_Results_Data:
    # print("detected..")
    # print(key,VA_Election_Results_Data[key])
    obj['properties']['Election_Data'] = VA_Election_Results_Data[key]


print("Results from adding election information")
successful_election_additions=0
failed_election_additions=0
for item in Virginia_Result_Data['features']:
  props=item['properties']
  if 'Election_Data' in props:
    successful_election_additions += 1
  else:
    failed_election_additions +=1
    item['properties']['Election_Data'] = {
      "precinct_name": None,
      "district_id": None,
      "votes_for_dem_cand": None,
      "votes_for_rep_cand": None,
      "votes_for_other_cand": None,
      "votes_total": None
    }
print("Successful additions: {}\n, Failed additions (flled with null): {}".format(
  successful_election_additions, failed_election_additions))


# write json to file
with open("Data/Virgina_Result_Data", "w") as json_file:
  json.dump(Virginia_Result_Data,json_file,indent=4)
print("Successful agregation of VA data")