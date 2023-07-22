import { IRecipient } from "../services/sendEmail"

// Dev specific variables

// export const dbPassword: string = "Bob.sql04"
export const dbPassword: string = "Password1!"

// export const devRecipient: IRecipient = { name: 'Matthew Slater', email: 'mattslat4@gmail.com' }
export const devRecipient: IRecipient = { name: 'Mike Misiura', email: 'mikemisiura@gmail.com' }



// private Nylas Info

type nylasClientDataType = {
    clientId: string,
    clientSecret: string,
    accessToken: string
}

export const nylasClientData: nylasClientDataType = {
    clientId: "3rpjzy85rc05asggritjluxqj",
    clientSecret: "40a07pb7tlzwurjh2eewbxzc0",
    accessToken: "ApsZHaJETSRm2z0P6KxgEvVKSPwkVZ"
}
