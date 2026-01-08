const config: { [key: string]: { gateway: string; base: string } } = {
    development: {
     gateway : "http://localhost:3001",
     base: "/admin/v1"   
    },
    production: {
        gateway : "http://localhost:3001",
        base: "/admin/v1"   
    },
    test: {
        gateway: "http://localhost:3001",
        base: "/admin/v1"
    }
}

export default function getEnvironment() {
    return config[process.env.NODE_ENV || 'development'];
}