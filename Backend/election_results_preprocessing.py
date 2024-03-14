import pandas as pd

df = pd.read_csv("Data/Virginia_Election_Results_Raw.csv")

# print(df.head)
# print('------------------------------------------------------------------------------')
# print(df.columns)
# print("---------------------------------------------------------------------------")
# print("the precinct id series...")


# campbell = df[df['LocalityName'] == "CAMPBELL COUNTY"]
# uni_precinct_ids = campbell["PrecinctId"].unique()
# for pid in uni_precinct_ids:
#   onepid = campbell[campbell["PrecinctId"] == pid]
#   print(onepid)
#   # print(onepid["CandidateId"].unique())
#   break

# filter by election type - House of Delegates
df = df[df["OfficeTitle"].str.contains("House of Delegates")]

# 'CandidateName','LocalityName','OfficeTitle'
# print(house_of_delegates_df[['CandidateName','LocalityName','OfficeTitle']])

all_districts = df["OfficeTitle"].unique()
# look at unique values in office title
listcols = ['CandidateName','TOTAL_VOTES','PrecinctId','LocalityName','OfficeTitle']
pd.set_option('display.max_rows', None)
for district in all_districts:
  print(f"Race ---> {district}")
  print()
  num_rows_in_race = df[df["OfficeTitle"]==district][listcols].shape[0]

  print(df[df["OfficeTitle"]==district][listcols])
  # for given district, filter by county
  print("\n\nthe counties that make up the district include ...\n\n\n")
  counties_in_district = df[df["OfficeTitle"]==district]['LocalityName'].unique()
  print(counties_in_district,"\n\n")

  # for given county, look at precincts
  for county in counties_in_district:
    temp = df[df["OfficeTitle"]==district]
    # print("\n\n\nboobarb\n")
    county_df = temp[temp['LocalityName'] == county]
    # print(county_df[listcols])
    
    # for each county, analyze precincts
    county_specific_precincts = county_df["PrecinctId"].unique()
    for precinct in county_specific_precincts:
      print(county_df[county_df["PrecinctId"]== precinct][listcols])

  print('---------------------------------------------------------------------------')
  break