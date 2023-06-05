import './index.css'
import { Suspense } from 'react'
import { Link, NavLink, Outlet, useLoaderData, Await,defer } from "react-router-dom"
import { getVan } from "../../../api"
import { requireAuth } from "../../../utils"

export const loader = async ({ params, request }) => {
    await requireAuth(request);
    return defer({ currentVan: getVan(params.id) });
}

const HostVanDetail = () => {
    const dataPromise = useLoaderData()

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const renderVanElement = (currentVan) => {
        return (
            <div className="host-van-detail-layout-container">
                    <div className="host-van-detail">
                        <img src={currentVan.imageUrl} alt={currentVan.name} />
                        <div className="host-van-detail-info-text">
                            <i
                                className={`van-type van-type-${currentVan.type}`}
                            >
                                {currentVan.type.charAt(0).toUpperCase() + currentVan.type.slice(1)}
                            </i>
                            <h3>{currentVan.name}</h3>
                            <h4>${currentVan.price}/day</h4>
                        </div>
                    </div>

                    <nav className="host-van-detail-nav">
                        <NavLink
                            to="."
                            end
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Details
                        </NavLink>
                        <NavLink
                            to="pricing"
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Pricing
                        </NavLink>
                        <NavLink
                            to="photos"
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Photos
                        </NavLink>
                    </nav>
                    <Outlet context={{ currentVan }} />
                </div>
        )
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>
            <Suspense fallback={<h2>Loading host van...</h2>}>
                <Await resolve={dataPromise.currentVan}>
                    {renderVanElement} 
                </Await>
            </Suspense>
        </section>
    )
}

export default HostVanDetail;
