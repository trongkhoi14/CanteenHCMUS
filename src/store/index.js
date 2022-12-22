import { provider, ProviderComposer } from './combine';
import { AuthProvider, UserProvider, CartProvider, 
    GoodsProvider, ScheduleProvider, ReceiveProvider, ProfileProvider,
 BussinessProvider, DeliveryProvider } from './provider';

export default function Provider({ children }) {
    return (
        <ProviderComposer
            providers={[
                provider(AuthProvider),
                provider(UserProvider),
                provider(ProfileProvider),
                provider(CartProvider),
                provider(GoodsProvider),
                provider(ScheduleProvider),
                provider(ReceiveProvider),
                provider(DeliveryProvider),
                provider(BussinessProvider),
            ]}
        >
            {children}
        </ProviderComposer>
    )
}