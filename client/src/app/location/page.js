"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("pigeon-maps").then((m) => m.Map), { ssr: false });
const Marker = dynamic(() => import("pigeon-maps").then((m) => m.Marker), { ssr: false });

const fetchJson = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
};

export default function LocationPage() {
  const [store, setStore] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [distanceLoading, setDistanceLoading] = useState(false);

  useEffect(() => {
    const loadLocation = async () => {
      try {
        const { data } = await fetchJson("/api/location");
        setStore(data);
      } catch (err) {
        setGeoError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadLocation();
  }, []);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported by your browser.");
      return;
    }
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserCoords(coords);
        if (store?.coordinates?.lat && store?.coordinates?.lng) {
          setDistanceLoading(true);
          fetchJson("/api/location/distance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(coords),
          })
            .then((res) => setDistance(res.data.distance))
            .catch((err) => setGeoError(err.message))
            .finally(() => setDistanceLoading(false));
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError("Location permission denied.");
        } else {
          setGeoError("Unable to retrieve location.");
        }
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  const center = useMemo(() => {
    if (store?.coordinates) {
      return [store.coordinates.lat, store.coordinates.lng];
    }
    return [0, 0];
  }, [store]);

  const userMarker = useMemo(() => {
    if (!userCoords) return null;
    return [userCoords.lat, userCoords.lng];
  }, [userCoords]);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-amber-700">Visit Us</p>
          <h1 className="text-3xl font-semibold">Wild Bean Coffee</h1>
          <p className="text-zinc-600">
            Find our shop, view hours, and see your distance if you share location.
          </p>
        </header>

        {loading && <p>Loading location...</p>}
        {!loading && !store && <p className="text-red-600">No location available.</p>}

        {store && (
          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
            <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
              <div className="h-[360px] w-full">
                <Map height={360} defaultCenter={center} defaultZoom={14}>
                  <Marker
                    width={40}
                    anchor={[store.coordinates?.lat || 0, store.coordinates?.lng || 0]}
                    color="#b45309"
                  />
                  {userMarker && <Marker width={30} anchor={userMarker} color="#2563eb" />}
                </Map>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                <span>
                  Store: {store.address1}, {store.city} {store.state} {store.postalCode}
                </span>
                {distance && (
                  <span className="font-medium">
                    You are ~{distance.miles.toFixed(1)} mi ({distance.km.toFixed(1)} km)
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Address & Contact</h2>
                <p className="text-zinc-700">
                  {store.address1}
                  {store.address2 ? `, ${store.address2}` : ""}, {store.city}, {store.state}{" "}
                  {store.postalCode}
                </p>
                {store.phone && <p className="text-zinc-700">Phone: {store.phone}</p>}
                {store.email && <p className="text-zinc-700">Email: {store.email}</p>}
              </div>

              <div>
                <h2 className="text-lg font-semibold">Hours</h2>
                <ul className="text-zinc-700">
                  {store.hours?.map((h) => (
                    <li key={h.day}>
                      {h.day}: {h.closed ? "Closed" : `${h.opens || "--"} - ${h.closes || "--"}`}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Your Location</h2>
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  className="rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {distanceLoading ? "Calculating..." : "Use my location"}
                </button>
                {geoError && <p className="text-sm text-red-600">{geoError}</p>}
                {userCoords && !distanceLoading && !distance && (
                  <p className="text-sm text-zinc-700">
                    Location captured. Distance calculation pending store coords.
                  </p>
                )}
              </div>

              {store.mapsUrl && (
                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:underline"
                >
                  Open in Maps
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

