import { LayoutDashboard, Inbox, Terminal, History, LogOut } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from './ui/sidebar'

const items = [
    { title: 'Resumen', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Actividad', url: '/actividad', icon: Inbox },
    { title: 'Consola', url: '/consola', icon: Terminal },
    { title: 'Historial', url: '/historial', icon: History },
]

export default function AppSidebar() {
    const location = useLocation()
    const navigate = useNavigate()
    const { cerrarSesion } = useAuth()


    return (
        <Sidebar className="border-slate-800 bg-slate-900 text-slate-100 [&_[data-slot=sidebar-inner]]:border-slate-800 [&_[data-slot=sidebar-inner]]:bg-slate-900">
            <SidebarHeader>
                <span className="px-2 py-2 text-lg font-semibold tracking-tight text-slate-100">
                    Secure<span className="text-emerald-400">Way</span>
                </span>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        onClick={() => navigate(item.url)}
                                        isActive={location.pathname === item.url}
                                        className="h-11 border-l-2 border-transparent px-3 text-base text-slate-300 hover:bg-slate-800 hover:text-slate-100 data-[active=true]:border-teal-300 data-[active=true]:bg-teal-400/20 data-[active=true]:font-semibold data-[active=true]:text-teal-200 data-[active=true]:hover:bg-teal-400/25"
                                    >
                                        <item.icon className="size-5" />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarMenu className="mt-auto p-2">
                <SidebarMenuItem>
                    <SidebarMenuButton
                        onClick={cerrarSesion}
                        className="h-11 px-3 text-base text-slate-300 hover:bg-red-500/10 hover:text-red-300"
                    >
                        <LogOut className="size-5" />
                        <span>Cerrar sesión</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </Sidebar>
    )
}