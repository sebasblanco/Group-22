import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "Features",
  description: "Gamer Insights Features",
};

export default function Features() {
    return(
<div>
  <Header />
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:text-center">
    <br></br>
      <p className="mt-2 text-3xl font-bold tracking-tight text-cyan-50 sm:text-4xl">Become Data Driven</p>
      <p className="mt-6 text-lg leading-8 text-cyan-50">Plan your next move</p>
    </div>
    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        <div className="relative pl-16">
          <dt className="text-base font-semibold leading-7 text-cyan-50">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            Instant Updates
          </dt>
          <dd className="mt-2 text-base leading-7 text-cyan-50">After every game, come here to view your match history, win-rate, most played heroes, and game-data</dd>
        </div>
        <div className="relative pl-16">
          <dt className="text-base font-semibold leading-7 text-cyan-50">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            Lock in
          </dt>
          <dd className="mt-2 text-base leading-7 text-cyan-50">Can't make it to the top if you can't see it. See how your friends are doing with just their username</dd>
        </div>
        <div className="relative pl-16">
          <dt className="text-base font-semibold leading-7 text-cyan-50">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            Simple Interface
          </dt>
          <dd className="mt-2 text-base leading-7 text-cyan-50">Our services are quick and easy so you and your champion can get back to winning in League</dd>
        </div>
      </dl>
    </div>
    <Footer />
  </div>
</div>
    )
}