import { redirect } from "solid-start";
import { createCookieSessionStorage } from "solid-start/session";
import User from "../models/User";

export async function register(mail: string, pass: string){
    try{
        const newUser = new User({
            id: Math.random().toString(36).replace(/[^a-z]+/g, '').slice(2, 18),
            mail,
            pass
        })
        const savedData = await newUser.save()
        if(savedData) return("201 user saved")
    } catch (err) {
        return("500 database error")
    }
}

export async function login(mail: string, pass: string){
    const user = User.findOne({email: mail, password: pass })
    if(!user)
        return null
    
}

const storage = createCookieSessionStorage({
    cookie:{
        name: "Note_session",
        secure: true,
        secrets: ["mxsholr"],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true
    }
})

export function getUserSession(request: Request) {
    return storage.getSession(request.headers.get("Cookie"))
}

export async function getUserId(request: Request) {
    const session = await getUserSession(request)
    const userId = session.get("userId")
    if (!userId || typeof userId !== "string") return null
    return userId
}

export async function requireUserId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
) {
    const session = await getUserSession(request)
    const userId = session.get("userId")
    if (!userId || typeof userId !== "string"){
        const searchParams = new URLSearchParams([["redirectTo", redirectTo]])
        throw redirect(`/login${searchParams}`)
    }
    return userId
}

export async function getUser(request: Request){
    console.log("getuser function triggered inside /src/controllers/user.ts")
    const userId = await getUserId(request)
    if(typeof userId !== "string") return null
    try {
        const user = await User.findOne({id: userId})
        return user
    } catch {
        return("logged out, no user found")
        throw logout(request)
    }
}

export async function logout(request: Request){
    const session = await storage.getSession(request.headers.get("Cookie"))
    return redirect("/login", {
        headers: {
            "Set-Cookie": await storage.destroySession(session)
        }
    })
}

export async function createUserSession(userId: string, redirectTo: string) {
    const session = await storage.getSession()
    session.set("userId", userId)
    return redirect(redirectTo, {
        headers:{
            "Set-Cookie": await storage.commitSession(session)
        }
    })
}