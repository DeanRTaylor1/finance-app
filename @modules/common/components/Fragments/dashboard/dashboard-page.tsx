import { userProfileData, userStateData } from "@modules/common/types/types-interfaces"
import { getCurrencySymbol } from "@modules/common/utils/currency"
import { getDailySpend, getWeeklySavings } from "@modules/common/utils/math"
import { numberWithCommas } from "@modules/common/utils/number-with-comma"
import { toNormalCase } from "@modules/common/utils/utility-functions"
import axios from "axios"
import { useEffect, useState } from "react"
import LoadingCircle from "../../loadingbar/loading-circle"
import DashBoardBox, { DashBoardBoxProps } from "./dashboard-box"
import DashboardChart from "./line-graph"





const DashboardPage: React.FC<any> = ({ currentUser }) => {

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [userData, setUserData] = useState<any>(null)
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 30)))
  const [endDate, setEndDate] = useState<Date>(new Date())

  const getUserData = async (email: string, startDate: Date, endDate: Date) => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/finances/outgoings/dashboard`,
      { headers: { email, startdate: startDate.toISOString(), enddate: endDate.toISOString() }, withCredentials: true })
    console.log(response.data)
    setUserData(response.data)
  }

  useEffect(() => {
    getUserData(currentUser.email, startDate, endDate)
    let loadingTimer = setTimeout(() => setIsLoading(false), 750);
    return () => {
      clearTimeout(loadingTimer)
    }

  }, [])

  const getCurrency = (currency: string) => {
    return {
      __html: getCurrencySymbol(currency)
    }
  }

  const headlineItems = [
    userData && { title: 'Weekly Max Savings', value: `${getCurrencySymbol(userData.currency)}${numberWithCommas(getWeeklySavings(userData.monthlySalary, userData.total))}` },
    userData && { title: 'Average Daily Spend', value: `${getCurrencySymbol(userData.currency)}${numberWithCommas(getDailySpend(userData.monthlySalary))}` }
  ].filter(Boolean).map((headline) => {
    return <DashBoardBox title={headline.title} value={headline.value} />
  })


  return (
    <div className="h-fit pt-8 min-h-[calc(90vh)]  max-w-[800px] flex flex-col gap-4 justify-start items-center w-[100%]">
      <div className="w-full flex gap-8 flex-wrap justify-center">
        {!userData && <LoadingCircle />}
        {userData && headlineItems}
      </div>
      <div className="h-12 w-full bg-white mr-6 ml-6">Dates</div>
      <div className="aspect-video w-full bg-white mr-6 ml-6">
       {userData && <DashboardChart expenses={userData.expenses} startDate={startDate} endDate={endDate} dailySpend={getDailySpend(userData.monthlySalary)}/>}
      </div>
    </div>
  )
}



export default DashboardPage
