import React, { useEffect, useMemo, useState, useRef, forwardRef } from "react";
import { Map } from "../map.screen.styles";
import GeoViewport from "@mapbox/geo-viewport";
import { Dimensions, LayoutAnimation } from "react-native";
import { PROVIDER_GOOGLE, Marker, MapViewProps } from "react-native-maps";
import { FadeInViewFaster } from "../../../../components/animations/fadeFaster.animation";
import { ExpandView } from "../../../../components/animations/expand.animation";
import { SvgXml } from "react-native-svg";
import LocationSelected from "../../../../../assets/images/LocationSelected";
import { MapClusteringProps } from "./ClusteredMapViewTypes";

import SuperCluster from "supercluster";
import ClusterMarker from "./ClusteredMarker";
import PlaceIcons from "../../../../../assets/PlaceIcons";
import { TouchableOpacity } from "react-native";
import { Polygons } from "./Polygons";

export const ClusteredMap = forwardRef<MapClusteringProps & MapViewProps, any>(
  (
    {
      newPlaceSelectionMode = {},
      children,
      region = {},
      updateRegion,
      location = {},
      LATITUDE_DELTA = {},
      LONGITUDE_DELTA = {},
      Places = {},
      writeMode = {},
      isAddressLoading = {},
      Markers = {},
      setCalibratedLocation,
      setMarkers,
      radius,
      maxZoom,
      minZoom,
      minPoints,
      extent,
      nodeSize,
      onClusterPress,
      onRegionChangeComplete,
      onMarkersChange,
      preserveClusterPressBehavior,
      clusteringEnabled,
      renderCluster,
      tracksViewChanges,
      spiralEnabled,
      superClusterRef,
      setPressedAddress,
      setPressedAddressName,
      ...restProps
    },
    ref
  ) => {
    const [markers, updateMarkers] = useState([]);
    const [isPressed, setIsPressed] = useState(null);
    const mapRef = useRef();
    // const [currentRegion, updateRegion] = useState(
    //   restProps.region || restProps.initialRegion
    // );

    const [spiderMarkers, updateSpiderMarker] = useState([]);
    const [clusterChildren, updateClusterChildren] = useState(null);
    const [otherChildren, updateChildren] = useState([]);
    const [isSpiderfier, updateSpiderfier] = useState(false);
    const [superCluster, setSuperCluster] = useState(null);
    const propsChildren = useMemo(
      () => React.Children.toArray(children),
      [children]
    );
    const { width, height } = Dimensions.get("window");

    ///////
    const isMarker = (child: JSX.Element): boolean =>
      child &&
      child.props &&
      child.props.coordinate &&
      child.props.cluster !== false;

    const calculateBBox = (region) => {
      let lngD;
      if (region.longitudeDelta < 0) lngD = region.longitudeDelta + 360;
      else lngD = region.longitudeDelta;

      return [
        region.longitude - lngD, // westLng - min lng
        region.latitude - region.latitudeDelta, // southLat - min lat
        region.longitude + lngD, // eastLng - max lng
        region.latitude + region.latitudeDelta, // northLat - max lat
      ];
    };

    const returnMapZoom = (region, bBox, minZoom) => {
      const viewport =
        region.longitudeDelta >= 40
          ? { zoom: minZoom }
          : GeoViewport.viewport(bBox, [width, height]);

      return viewport.zoom;
    };

    const markerToGeoJSONFeature = (marker, index) => {
      return {
        type: "Feature",
        geometry: {
          coordinates: [
            marker.props.coordinate.longitude,
            marker.props.coordinate.latitude,
          ],
          type: "Point",
        },
        properties: {
          point_count: 0,
          index,
          ..._removeChildrenFromProps(marker.props),
        },
      };
    };

    const _removeChildrenFromProps = (props) => {
      const newProps = {};
      Object.keys(props).forEach((key) => {
        if (key !== "children") {
          newProps[key] = props[key];
        }
      });
      return newProps;
    };

    const generateSpiral = (marker, clusterChildren, markers, index) => {
      const { properties, geometry } = marker;
      const count = properties.point_count;
      const centerLocation = geometry.coordinates;

      const res = [];
      let angle = 0;
      let start = 0;

      for (let i = 0; i < index; i++) {
        start += markers[i].properties.point_count || 0;
      }

      for (let i = 0; i < count; i++) {
        angle = 0.25 * (i * 0.5);
        const latitude = centerLocation[1] + 0.0002 * angle * Math.cos(angle);
        const longitude = centerLocation[0] + 0.0002 * angle * Math.sin(angle);

        if (clusterChildren[i + start]) {
          res.push({
            index: clusterChildren[i + start].properties.index,
            longitude,
            latitude,
            centerPoint: {
              latitude: centerLocation[1],
              longitude: centerLocation[0],
            },
          });
        }
      }
      return res;
    };
    /////////////////////////

    const KOREA_BOUNDS = {
      NW: [127.04561244696379, 37.619047563271586],
      SE: [127.0126025006175, 37.562442566816166],
    };
    ///////////////

    useEffect(() => {});
    useEffect(() => {
      const rawData = [];
      const otherChildren = [];

      if (!clusteringEnabled) {
        updateMarkers([]);
        updateChildren(propsChildren);
        setSuperCluster(null);
        return;
      }

      propsChildren.forEach((child, index) => {
        if (isMarker(child)) {
          rawData.push(markerToGeoJSONFeature(child, index));
        } else {
          otherChildren.push(child);
        }
      });

      const superCluster = new SuperCluster({
        radius,
        maxZoom,
        minZoom,
        minPoints,
        extent,
        nodeSize,
      });

      superCluster.load(rawData);

      const bBox = calculateBBox(region);
      const zoom = returnMapZoom(region, bBox, minZoom);
      const markers = superCluster.getClusters(bBox, zoom);

      updateMarkers(markers);

      updateChildren(otherChildren);
      setSuperCluster(superCluster);

      superClusterRef.current = superCluster;
    }, [clusteringEnabled]);

    const _onClusterPress = (cluster) => () => {
      const children = superCluster.getLeaves(cluster.id, Infinity);
      updateClusterChildren(children);

      if (preserveClusterPressBehavior) {
        onClusterPress(cluster, children);
        return;
      }

      const coordinates = children.map(({ geometry }) => ({
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: restProps.edgePadding,
      });

      onClusterPress(cluster, children);
    };

    useEffect(() => {
      if (!spiralEnabled) {
        return;
      }

      if (isSpiderfier && markers.length > 0) {
        const allSpiderMarkers = [];
        let spiralChildren = [];
        markers.map((marker, i) => {
          if (marker.properties.cluster) {
            spiralChildren = superCluster.getLeaves(
              marker.properties.cluster_id,
              Infinity
            );
          }
          const positions = generateSpiral(marker, spiralChildren, markers, i);
          allSpiderMarkers.push(...positions);
        });

        updateSpiderMarker(allSpiderMarkers);
      } else {
        updateSpiderMarker([]);
      }
    }, [isSpiderfier, markers]);

    const _onRegionChangeComplete = (region) => {
      if (superCluster && region) {
        const bBox = calculateBBox(region);
        const zoom = returnMapZoom(region, bBox, minZoom);
        const markers = superCluster.getClusters(bBox, zoom);

        if (zoom >= 18 && markers.length > 0 && clusterChildren) {
          if (spiralEnabled) {
            updateSpiderfier(true);
          }
        } else {
          if (spiralEnabled) {
            updateSpiderfier(false);
          }
        }
        updateMarkers(markers);
        onMarkersChange(markers);
        onRegionChangeComplete(region, markers);
        updateRegion(region);
      } else {
        onRegionChangeComplete(region);
      }
    };

    /////////////
    return (
      <Map
        onLongPress={() => {
          setIsPressed(null);
        }}
        {...restProps}
        ref={(map) => {
          mapRef.current = map;
          if (ref) {
            ref.current = map;
          }
          restProps.mapRef(map);
        }}
        showsUserLocation={true}
        showsCompass={true}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={_onRegionChangeComplete}
        onMapReady={() => {
          mapRef.current.setMapBoundaries(
            { latitude: 37.593205590131035, longitude: 127.03426904976367 },
            { latitude: 37.57720582175098, longitude: 127.02493898570536 }
          );
        }}
        minZoomLevel={17}
        customMapStyle={[
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi.business",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi.medical",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },

          {
            featureType: "poi.sports_complex",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi.school",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi.government",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi.place_of_worship",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
        ]}
      >
        {markers.map((marker) =>
          marker.properties.point_count === 0 ? (
            propsChildren[marker.properties.index]
          ) : !isSpiderfier ? (
            renderCluster ? (
              renderCluster({
                onPress: _onClusterPress(marker),

                ...marker,
              })
            ) : (
              <ClusterMarker
                key={`cluster-${marker.id}`}
                {...marker}
                onPress={_onClusterPress(marker)}
                tracksViewChanges={tracksViewChanges}
              />
            )
          ) : null
        )}
        {otherChildren}
        {writeMode && !isAddressLoading
          ? Markers.map((Mker) => {
              return (
                <Marker
                  style={{ zIndex: 999 }}
                  //장소선택 마커의 위치

                  coordinate={Markers[0]}
                >
                  <FadeInViewFaster>
                    <ExpandView>
                      <SvgXml xml={LocationSelected} width={33.5} height={54} />
                    </ExpandView>
                  </FadeInViewFaster>
                </Marker>
              );
            })
          : null}
        {writeMode && !isAddressLoading && !newPlaceSelectionMode
          ? Places.map((Place) => {
              return (
                <Marker
                  style={{ zIndex: 1 }}
                  //장소선택 마커의 위치

                  coordinate={{
                    latitude: parseFloat(Place.y),
                    longitude: parseFloat(Place.x),
                  }}
                  onPress={() => {
                    setIsPressed(Place);
                    console.log(isPressed);
                    setPressedAddressName(Place.place_name);
                    setPressedAddress(Place.road_address_name);
                    setMarkers([]);
                    setCalibratedLocation({
                      lat: parseFloat(Place.y),
                      lng: parseFloat(Place.x),
                    });
                  }}
                >
                  {Place == isPressed ? (
                    <FadeInViewFaster>
                      <ExpandView>
                        <SvgXml xml={PlaceIcons} width={1} height={1} />
                      </ExpandView>
                    </FadeInViewFaster>
                  ) : (
                    <TouchableOpacity>
                      <FadeInViewFaster>
                        <ExpandView>
                          <SvgXml xml={PlaceIcons} width={11} height={11} />
                        </ExpandView>
                      </FadeInViewFaster>
                    </TouchableOpacity>
                  )}
                </Marker>
              );
            })
          : null}
        <Polygons map={mapRef} />
      </Map>
    );
  }
);

ClusteredMap.defaultProps = {
  clusteringEnabled: true,
  spiralEnabled: true,
  animationEnabled: true,
  preserveClusterPressBehavior: false,
  layoutAnimationConf: LayoutAnimation.Presets.spring,
  tracksViewChanges: false,
  // SuperCluster parameters
  radius: Dimensions.get("window").width * 0.06,
  maxZoom: 20,
  minZoom: 1,
  minPoints: 2,
  extent: 512,
  nodeSize: 64,
  // Map parameters
  edgePadding: { top: 50, left: 50, right: 50, bottom: 50 },
  // Cluster styles

  // Callbacks
  onRegionChangeComplete: () => {},
  onClusterPress: () => {},
  onMarkersChange: () => {},
  superClusterRef: {},
  mapRef: () => {},
};
