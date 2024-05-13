import json

opp_map = "opp_maps.json"

with open(opp_map, 'r') as file:
    opp_map_json = json.load(file)

    for race in ['europeanpop', 'afampop', 'seasianpop', 'hisppop']:
        for type in ['max', 'min']:
            with open(f'{race}_{type}_opp_map.json', 'w') as wf:
                json.dump(opp_map_json[race][type]["geojson"], wf)