import pandas as pd

df = pd.read_csv("Data\Virginia_Election Results_Raw.csv")
# print(df.head)
print('------------------------------------------------------------------------------')
# print(df.columns)
print("---------------------------------------------------------------------------")
print("the precinct id series...")
campbell = df[df['LocalityName'] == "CAMPBELL COUNTY"]
uni_precinct_ids = campbell["PrecinctId"].unique()
for pid in uni_precinct_ids:
  onepid = campbell[campbell["PrecinctId"] == pid]
  print(onepid)
  # print(onepid["CandidateId"].unique())
  break