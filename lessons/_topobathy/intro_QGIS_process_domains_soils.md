---
topic: topobathy

title: "Introduction to QGIS: Geomorphic Process Domains and Soils"
layout: single
permalink: /topobathy/intro_QGIS_process_domains_soils/

# Includes author profile in sidebar
author: Andrew Wickert
author_profile: true
---

## Learning Goals

* Become familiar with QGIS, a free and open source GIS
  * Install a QGIS plug-in to incorporate commercially-available (but viewable for free) imagery in a geospatial framework
  * Import a `*.bil` – an old but common binary data format for a geospatially-registered raster data file – into QGIS
  * Create and edit a GeoPackage layer
* Identify hillslope and fluvial geomorphic process domains based on topography
* Think through where you may find different soils
* Present your arguments and reasoning in writing
  * Well-reasoned arguments lead to a good grade, even if you are wrong!
  * Grammar, spelling, punctuation, and style may all be graded. Professional writing skills are essential and must be practiced. (Fancy is not necessary, but correct is.)

## Deliverables

* An exported map showing a DEM imported into QGIS, set up with a semi-transparent elevation color ramp over a shaded-relief map. Include a scale as well as (if needed) a legend. Use the Print Layout tool to produce this.
* This same map, but with the semi-transparent colored DEM replaced by semi-transparent GIS vector layers delineating hillslope vs. channel process domains in a subset of this landscape.
* Identify graphically and in words the locations on the landscape in which you expect to find the shallowest and deepest soils, as well as the youngest and oldest soils. Here, it is your reasoning that counts!

You are expected to hand in a **single PDF document** that is responsive to the above three bullet points, including both the maps and the text. There are many tools that you may use to stich PDFs together (web searches are your friend).

## Steps


### 1. Download QGIS

Mac, Windows:
https://qgis.org/en/site/forusers/download.html

Ubuntu Linux:
```
sudo apt install qgis qgis-dev
```

### 2. Download and unzip the DEM

[DEM](/assets/datasets/Minnesota_LiDAR_GIS_intro_lab.zip)

Note that this ZIP archive has many files in it! Each contains some data or metatadata, such as binary values that combine to give topographic information or geospatial referencing information.

*If you like: check out http://arcgis.dnr.state.mn.us/maps/mntopo/ to see where it came from. MnTopo is a great portal for high-resolution topography from across the state of Minnesota.*


### 3. Open QGIS and import the DEM

* Start a new project.
* Click on “Open Data Source Manager”
* Select “Raster”, and for the source, navigate to the `*.bil` file that you just extracted. Click “Add”.








<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
