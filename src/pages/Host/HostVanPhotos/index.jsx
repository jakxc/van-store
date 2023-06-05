import './index.css'
import { useOutletContext } from "react-router-dom"

const HostVanPhotos = () => {
    const { currentVan } = useOutletContext()
    return (
        <img 
            src={currentVan.imageUrl} 
            className="host-van-detail-image" 
            alt={currentVan.name}
        />
    )
}

export default HostVanPhotos;