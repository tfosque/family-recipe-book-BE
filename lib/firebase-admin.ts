// lib/firebase-admin.js
import admin from "firebase-admin";

const privateKey = `"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCUev9zLuR47EE9\n0NNsRiyQDUcy9poLRVk4hy9Edmc1XCWTcdaeLdp0W5rv8v6xvw7BzNCMqH7TU5yT\n97YZ2WrrTRxVq1lA/hNSVvYE5MJK6eD7JbisQjBcbbWA/Yc0qV40mcgJ2DvlivIG\n2FUZv00pPmswwYK4KJ10TGC3Ae6kH6eFvwfn1y8C9wkMXciHogSxI6K5A2to/ZAZ\nS/M1OlXZ5dkQJU5YCkrvtwWKcy1yELjTaSewYdhffFp0bL+SOah6Pal+IyBbDUJZ\num+JnaJMLwL81jfRblwiGtA+wCY1OHENN3SyZAI6dJN36VdeVne/UH/JwYiJnNAy\nrp6eC5U5AgMBAAECggEAH6mxAseLqiu7Z+q5wzudsiRavAfxZpjlw1O0pTVYofzh\n+HTMrxOZI7oLKsMXRCE5jONXz774uKj6WWV4HEAMeFwLwEsXb/Aef68SrI15z07b\njsMHBBjjRjqQ+45VAEpjz/TBPzQw5azBGuuUDjcIxdRNOGrzrMDgftXww+XyFWZl\ngzETQsI6qYFGTKs/tp3RzAp/O24/Z9m9RipCihH/DoiLfZd+EvpVf/jgN2/RfKUo\niLlbt1599VtF3iQBHISBZKgERipxM9W1paffL/UMIboAmD5KAoCEqkJZh8KFgsp7\nHab5+ieH2asAhRQHlulpuV9WzVfw6W3jc2npjjjw5wKBgQDFMvAAz2osf77LZqOs\nMfT7R8UxDFGiGFgb7ARPJmF6gIeW41jczOfz7V4roX55O/TIu7mJj4IJwXz/JHr1\nSDzjbt8yenJakt8yEDuTFTqWL92DtSmah8r1xq+fPEJYoFM0mIK63ZK/LUPUuKks\nkVhv8aL/KvHamiH4M7PNLsUlVwKBgQDAwSmZzjPQZA/0VzdVRyY6jTPG5jsgenQ2\nnyuCmowC7umg+eJ6DXnVyj31D3M1NwW5aoe0UPRfOG4s0sgRHUDUvWH7siLGkIXj\ndPHopfNTWkHnIyHoWTnnnIK5d0jZv4CzZl7glt3YnMuXR6vdCvrGzodCyQ6F5Sut\nMOXvuHtv7wKBgFyWB905hQ4ThE8Xh60nX3BDSDA5KnLCn0usynEnAgl0IzUS1PwG\nMLl0LwypLCpbnhhJG1mcyV8vOzLHu/tByWS2/5BBsUMZRjXJLU9nXjR5kLVv73Kg\nYwh2GqrWrgfSbn55RJfbxDSCWiCb+sH0E+OrPe40CY2rZFuWWsrxNJrNAoGAcnVB\nQreTRPdmEe2ISfdJ2BLo3/7utUaBo724lIE5CrTbvl8kAN3nru+9Arv96WeW2pdL\npeM8eR6FLdCsRJ1eVfVvLYqF4+sF1h8nVsLUTnaWE65lABebrtDdP0x50fNJdT4g\nsLRlX68bpeVFRKi0aUFSSHIjUZbX7KvQnhyqD7kCgYAcpYqODhSUCZlC74gqkC89\nEJN/ZrKAZPWkTc97mvMHNS2z2vrabR5JH+hnOO5jTLH6FUcxTVMG1gUxuQohRe6n\nl8dh1f2D7qn/Zw30ac6qAxEZvYSeG112n5LEdy2+kQ5/iN8AxmTotUsWwNRhRLgL\nDnhxLOD/5ZNZI+5rFknGCQ==\n-----END PRIVATE KEY-----\n"`;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "fir-end-2-end",
      clientEmail:
        "firebase-adminsdk-i7cc7@fir-end-2-end.iam.gserviceaccount.com",
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
  });
}

export const auth = admin.auth();
