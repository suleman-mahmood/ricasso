export async function GET(request: Request) {
	// const res = await fetch('https://dps.psx.com.pk/symbols');
	//
	const res = await fetch('https://dps.psx.com.pk/timeseries/int/PIAA');
	// const res = await fetch('https://dps.psx.com.pk/timeseries/eod/PIAA');

	const data = await res.json();

	return Response.json({ data });
}
