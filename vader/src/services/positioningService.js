export function getPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation)  {
            navigator.geolocation.getCurrentPosition(pos => {
                console.log(pos.coords.longitude)
                resolve({
                    position: {
                        lat : pos.coords.latitude,
                    long : pos.coords.longitude,
                    },
                })
            })
        } else {
            reject("geolocation is not supported by this browser")
        }
    })
}