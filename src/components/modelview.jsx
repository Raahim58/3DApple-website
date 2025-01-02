import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import Lights from "./lights"
import Loader from "./loader"
import { Suspense } from "react"
import Iphone from "./iphone"

import * as THREE from 'three'

const modelview = ({index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
    // Orbit control allows to move the camera around the scene
    return (
        <View
            index={index}
            id={gsapType}
            className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
        >
            {/* Ambient light */}
            <ambientLight intensity={0.5} />
            <PerspectiveCamera makeDefault position={[0, 0, 4]}/>
            <Lights />
            <OrbitControls 
                makeDefault
                ref={controlRef}
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.5}
                target={new THREE.Vector3(0, 0, 0)}
                onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
            />
            <group ref={groupRef} name={`${index === 1} ? 'small': 'large'`} position={[0, 0, 0]}>

            </group>
            <Suspense fallback={<Loader/>}>
                <Iphone 
                    scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
                    item={item}
                    size={size}
                />
            </Suspense>
        </View>
    )
}

export default modelview
