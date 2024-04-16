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

Virginia_Result_Data = {}

VA_Precinct_Boundary_Data = None
with open('Data/virginia_precinct_boundary_data.json', 'r') as file:
  VA_Precinct_Boundary_Data = json.load(file)

VA_Precinct_Boundary_Data=VA_Precinct_Boundary_Data['features']
# pprint.pprint(VA_Precinct_Boundary_Data)

VA_Demographic_Data = None
with open('Data/va_demographics_data.json','r') as file:
  VA_Demographic_Data=json.load(file)

# approach to aggregation - treat dictionaries as sets, and to join into result

# deep copy for comparison later
deep_copy_dem = copy.deepcopy(VA_Demographic_Data)
deep_copy_boundary = copy.deepcopy(VA_Precinct_Boundary_Data)

# join boundary data with demographic data
for obj in deep_copy_boundary:
  geometry_type=obj['geometry']['type']
  geometry_coords=obj['geometry']['coordinates']
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
      Virginia_Result_Data[iden] = {
        "Demographic_Data":dem_data,
        "Boundary_Data": obj['geometry']
      }
      del VA_Demographic_Data[iden]
      VA_Precinct_Boundary_Data.remove(obj)

    # county_fips_code_2 = int(iden[0])
    # vtd_id_2 = int(iden[1])
    # print(county_fips_code_1,county_fips_code_2)
    # print(vtd_id_1,vtd_id_2)
  
  # print(geometry_type)


# pprint.pprint(Virginia_Result_Data)

# look at VA_Demographic_Data, VA_Precinct_Boundary_Data


'''
print("The contents of each list after")
print(len(VA_Demographic_Data))
print(len(VA_Precinct_Boundary_Data))
pprint.pprint(VA_Precinct_Boundary_Data)

# boundary data still has two entries - handle later!!!

'''

# merge with election results data

