import { LatLngBoundsExpression } from "leaflet";
import { useMap } from "react-leaflet";


const FitBounds = ({ positions }: { positions: [number, number][] }) => {

    const map = useMap();
    if (positions.length > 0) {
        const bound: LatLngBoundsExpression = positions;
        map.fitBounds(bound, { padding: [50, 50] });
    }
    return null;
}

export default FitBounds