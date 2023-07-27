import {
  SimpleGrid,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  GridItem,
} from "@chakra-ui/react";
import { format } from "d3-format";
import * as React from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import { estimatedRowCountObj } from "@/data/queries";
import { connectionConfig, tickDurationMs } from "@/data/recoil";
import { formatMs } from "@/format";

import { Loader } from "./customcomponents/loader/Loader";

const StatWrapper = ({
  statLabel,
  statNumber,
  colSpan,
}: {
  statLabel: string;
  statNumber: string;
  colSpan?: number;
}) => {
  return (
    <GridItem
    padding="20px"
    background={useColorModeValue("#ECE8FD", "#2F206E")}
    borderRadius="15px"
    colSpan={colSpan || 1}
    >
      <Stat>
      <StatLabel>{statLabel}</StatLabel>
      <StatNumber color={useColorModeValue("#553ACF", "#CCC3F9")}>
        {statNumber}
      </StatNumber>
    </Stat>
    </GridItem>
  );
};

export const Stats = ({
  page,
}: {
  page: string;
}) => {
  const config = useRecoilValue(connectionConfig);
  const matchingDuration = useRecoilValue(tickDurationMs("SimulatorMatcher"));
  const updateSegmentsDuration = useRecoilValue(
    tickDurationMs("SimulatorUpdateSegments")
  );
  const tableCounts = useSWR(
    ["notificationsMapTableCounts", config],
    () =>
      estimatedRowCountObj(
        config,
        "offers",
        "subscribers",
        "cities",
        "segments"
      ),
    { refreshInterval: 1000 }
  );
  const formatStat = format(".4~s");

  if (!tableCounts.data) {
    return <Loader size="small" centered />;
  }

  
  if (page == "transact") {
    return (
      <SimpleGrid spacing={2} minChildWidth="25%">
        <StatWrapper
          statLabel="Offers"
          statNumber={formatStat(tableCounts.data.offers)}
        />
        <StatWrapper
          statLabel="Cities"
          statNumber={formatStat(tableCounts.data.cities)}
        />
        <StatWrapper
          statLabel="Subscribers"
          statNumber={formatStat(tableCounts.data.subscribers)}
        />
      </SimpleGrid>
    );
  } else {
    return (
      <Grid gap={2} templateColumns="repeat(2, 1fr)">
        <StatWrapper
          statLabel="Segments"
          statNumber={formatStat(tableCounts.data.segments)}
          colSpan={2}
        />
        <StatWrapper
          statLabel="Segmentation"
          statNumber={formatMs(updateSegmentsDuration)}
        />
        <StatWrapper
          statLabel="Matching"
          statNumber={formatMs(matchingDuration)}
        />
      </Grid>
    );
  }
};
