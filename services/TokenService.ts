export async function getToken() {
  let deviceId = new Date().getTime();
  try {
    const res = await fetch("https://ext-api.vasttrafik.se/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_VASTTRAFIK_AUTH_KEY}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: `device_${deviceId}`,
      }).toString(),
    });
    const data = await res.json();
    return data?.access_token;
  } catch (error) {
    /* TODO: Implement error handling */
    console.error(error);
    alert("Could not get token");
  }
}
