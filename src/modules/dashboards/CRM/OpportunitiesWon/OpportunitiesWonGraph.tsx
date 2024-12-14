import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { OpportunitiesWonGraphDataType } from "@crema/types/models/dashboards/CRM";

type Props = {
  data: OpportunitiesWonGraphDataType[];
};

const OpportunitiesWonGraph = ({ data }: Props) => {
  return (
    <ResponsiveContainer maxHeight={260} minHeight={160}>
      <BarChart barGap={16} barSize={8} data={data}>
        <XAxis dataKey="name" />
        <Tooltip
          labelStyle={{ color: "black" }}
          contentStyle={{
            borderRadius: 12,
            borderColor: "#31354188",
            background: "#FFFFFFCA",
          }}
          cursor={{ fill: "transparent" }}
        />
        <Bar
          dataKey="progress"
          stackId="a"
          fill="#0a8fdce6"
          radius={[20, 20, 0, 0]}
          background={{ fill: "#0a8fdc26" }}
        />
        <Bar
          dataKey="actual"
          stackId="b"
          fill="#fb4f67e6"
          radius={[20, 20, 0, 0]}
          background={{ fill: "#fb4f6726" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OpportunitiesWonGraph;
