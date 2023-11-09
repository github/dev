#Import the folium package for making maps
import folium

#Create a map, centered (0,0), and zoomed out a bit:
mapWorld = folium.Map(location=[0, 0],zoom_start=3)

#Save the map:
mapWorld.save(outfile='tempMap.html')