import React from "react";
import { ResponsiveBar } from '@nivo/bar'


const data = [
    {
      "country": "AD",
      "hot dog": 130,
      "hot dogColor": "hsl(69, 70%, 50%)",
      "burger": 169,
      "burgerColor": "hsl(294, 70%, 50%)",
      "sandwich": 136,
      "sandwichColor": "hsl(36, 70%, 50%)",
      "kebab": 57,
      "kebabColor": "hsl(106, 70%, 50%)",
      "fries": 14,
      "friesColor": "hsl(125, 70%, 50%)",
      "donut": 7,
      "donutColor": "hsl(35, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 75,
      "hot dogColor": "hsl(358, 70%, 50%)",
      "burger": 95,
      "burgerColor": "hsl(42, 70%, 50%)",
      "sandwich": 65,
      "sandwichColor": "hsl(131, 70%, 50%)",
      "kebab": 81,
      "kebabColor": "hsl(314, 70%, 50%)",
      "fries": 114,
      "friesColor": "hsl(350, 70%, 50%)",
      "donut": 12,
      "donutColor": "hsl(35, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 109,
      "hot dogColor": "hsl(107, 70%, 50%)",
      "burger": 85,
      "burgerColor": "hsl(316, 70%, 50%)",
      "sandwich": 194,
      "sandwichColor": "hsl(188, 70%, 50%)",
      "kebab": 146,
      "kebabColor": "hsl(72, 70%, 50%)",
      "fries": 18,
      "friesColor": "hsl(193, 70%, 50%)",
      "donut": 104,
      "donutColor": "hsl(322, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 182,
      "hot dogColor": "hsl(137, 70%, 50%)",
      "burger": 81,
      "burgerColor": "hsl(91, 70%, 50%)",
      "sandwich": 144,
      "sandwichColor": "hsl(155, 70%, 50%)",
      "kebab": 144,
      "kebabColor": "hsl(360, 70%, 50%)",
      "fries": 184,
      "friesColor": "hsl(183, 70%, 50%)",
      "donut": 18,
      "donutColor": "hsl(103, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 200,
      "hot dogColor": "hsl(297, 70%, 50%)",
      "burger": 56,
      "burgerColor": "hsl(329, 70%, 50%)",
      "sandwich": 161,
      "sandwichColor": "hsl(234, 70%, 50%)",
      "kebab": 142,
      "kebabColor": "hsl(148, 70%, 50%)",
      "fries": 162,
      "friesColor": "hsl(255, 70%, 50%)",
      "donut": 45,
      "donutColor": "hsl(93, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 88,
      "hot dogColor": "hsl(181, 70%, 50%)",
      "burger": 141,
      "burgerColor": "hsl(204, 70%, 50%)",
      "sandwich": 101,
      "sandwichColor": "hsl(15, 70%, 50%)",
      "kebab": 49,
      "kebabColor": "hsl(88, 70%, 50%)",
      "fries": 178,
      "friesColor": "hsl(88, 70%, 50%)",
      "donut": 129,
      "donutColor": "hsl(45, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 146,
      "hot dogColor": "hsl(153, 70%, 50%)",
      "burger": 40,
      "burgerColor": "hsl(230, 70%, 50%)",
      "sandwich": 178,
      "sandwichColor": "hsl(7, 70%, 50%)",
      "kebab": 121,
      "kebabColor": "hsl(18, 70%, 50%)",
      "fries": 98,
      "friesColor": "hsl(80, 70%, 50%)",
      "donut": 73,
      "donutColor": "hsl(287, 70%, 50%)"
    }
  ]
  const MyResponsiveBar = ({ data }) => (
    <ResponsiveBar
        data={data}
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
)
const index = () => {
    
        return(
                <>
                <MyResponsiveBar data={data}/>
                </>
            
        )

}

export default index;