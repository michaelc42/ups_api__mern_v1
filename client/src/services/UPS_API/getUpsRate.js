
const getUpsRate = async (shipData) => {
    const {name, address, city,
         state, zipCode, country, phone, cart
    } = shipData

    let packages = []
    let totalWeight = 0

    for (const element in cart) {
        const stringCart = cart[element].shippingMeasurements
        
        const { length, width, height, weight } = stringCart

        for (let i = 0; i < cart[element].count; i++) {
            packages.push(`{
                    "PackagingType": {
                        "Code": "02"
                    },
                    "Dimensions": {
                        "UnitOfMeasurement": {
                            "Code": "IN"
                        },
                        "Length": "${length}",
                        "Width": "${width}",
                        "Height": "${height}"
                    },
                    "PackageWeight": {
                        "UnitOfMeasurement": {
                            "Code": "LBS"
                        },
                        "Weight": "${weight}"
                    } 
                }`)
            totalWeight += Number(weight)
        }
    }

    let package_json = `
    {
        "RateRequest": {
            "PickupType": {
                "Code": "01"
            },
            "Shipment": {
                "Shipper": {
                    "Name": "${process.env.REACT_APP_SHIPPER_NAME}",
                    "ShipperNumber": "",
                    "Address": {
                        "AddressLine": "${process.env.REACT_APP_SHIPPER_ADDRESS}",
                        "City": "${process.env.REACT_APP_SHIPPER_CITY}",
                        "StateProvinceCode": "${process.env.REACT_APP_SHIPPER_STATE}",
                        "PostalCode": "${process.env.REACT_APP_SHIPPER_ZIP}",
                        "CountryCode": "${process.env.REACT_APP_SHIPPER_COUNTRY}"
                    }
                },
                "ShipTo": {
                    "Name": "${name}",
                    "Address": {
                        "AddressLine": "${address}",
                        "City": "${city}",
                        "StateProvinceCode": "${state}",
                        "PostalCode": "${zipCode}",
                        "CountryCode": "${country}",
                        "ResidentialAddressIndicator": "true"
                    }
                },
                "ShipFrom": {
                    "Name": "${process.env.REACT_APP_SHIP_FROM_NAME}",
                    "TaxIdentificationNumber": "${process.env.REACT_APP_SHIP_FROM_TAX_ID}",
                    "Address": {
                        "AddressLine": "${process.env.REACT_APP_SHIP_FROM_ADDRESS}",
                        "City": "${process.env.REACT_APP_SHIP_FROM_CITY}",
                        "StateProvinceCode": "${process.env.REACT_APP_SHIP_FROM_STATE}",
                        "PostalCode": "${process.env.REACT_APP_SHIP_FROM_ZIP}",
                        "CountryCode": "${process.env.REACT_APP_SHIP_FROM_COUNTRY}"
                    }
                },
                "Service":{
                    "Code":"03",
                    "Description":"Ground"
                },
                "ShipmentTotalWeight": {
                    "UnitOfMeasurement": {
                        "Code": "LBS"
                    },
                    "Weight": "${totalWeight}"
                },
                "Package": [${packages.join()}],
                "DeliveryTimeInformation": {
                    "PackageBillType": "03"
                }
            }
        }
    }`

    const response = await fetch('/api/v1/ups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: package_json
    })
    if (!response.ok) {
        throw new Error("HTTP Error " + response.status)
    }
    const resData = await response.json()
    return resData
}

export default getUpsRate