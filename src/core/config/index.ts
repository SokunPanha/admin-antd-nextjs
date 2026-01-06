const config: { [key: string]: { gateway: string; base: string } } = {
    development: {
     gateway : "http://localhost:3000",
     base: "/admin/v1"   
    },
    production: {
        gateway : "",
        base: "/admin/v1"   
    },
    test: {
        gateway: "",
        base: ""
    }
}

export default function getEnvironment() {
    return config[process.env.NODE_ENV || 'development'];
}