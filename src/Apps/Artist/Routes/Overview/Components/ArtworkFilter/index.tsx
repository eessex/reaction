import { ArtworkFilter_artist } from "__generated__/ArtworkFilter_artist.graphql"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Toggle } from "Styleguide/Components/Toggle"
import { Box } from "Styleguide/Elements/Box"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Flex } from "Styleguide/Elements/Flex"
import { Radio } from "Styleguide/Elements/Radio"
import { Select } from "Styleguide/Elements/Select"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"
import { ArtworkFilterRefetchContainer } from "./ArtworkFilterRefetch"

interface Props {
  artist: ArtworkFilter_artist
  filters?: any // FIXME
}

class Filter extends Component<Props> {
  renderCategory(filters, category, counts) {
    const currentFilter =
      category === "major_periods"
        ? filters.state.major_periods[0]
        : filters.state[category]
    return counts.slice(0, 10).map((count, index) => {
      return (
        <Radio
          selected={currentFilter === count.id}
          value={count.id}
          onSelect={selected => {
            if (selected) {
              return filters.setFilter(category, count.id)
            } else {
              return filters.unsetFilter(category)
            }
          }}
          key={index}
        >
          {count.name}
        </Radio>
      )
    })
  }

  render() {
    const { aggregations } = this.props.artist.filtered_artworks
    const mediumAggregation = aggregations.find(agg => agg.slice === "MEDIUM")
    const galleryAggregation = aggregations.find(agg => agg.slice === "GALLERY")
    const institutionAggregation = aggregations.find(
      agg => agg.slice === "INSTITUTION"
    )
    const periodAggregation = aggregations.find(
      agg => agg.slice === "MAJOR_PERIOD"
    )

    return (
      <Subscribe to={[FilterState]}>
        {(filters: FilterState) => {
          return (
            <Responsive>
              {({ xs, sm, md }) => {
                return (
                  <React.Fragment>
                    <Flex>
                      {/* Sidebar Area */}
                      {!xs && (
                        <Sidebar width="30%" mr={2}>
                          <Flex
                            flexDirection="column"
                            alignItems="left"
                            mt={-1}
                            mb={1}
                          >
                            <Separator mb={1} />
                            <Checkbox
                              selected={filters.state.for_sale}
                              onSelect={value => {
                                return filters.setFilter("for_sale", value)
                              }}
                            >
                              For sale
                            </Checkbox>
                          </Flex>

                          <Toggle label="Medium" expanded>
                            {this.renderCategory(
                              filters,
                              "medium",
                              mediumAggregation.counts
                            )}
                          </Toggle>
                          <Toggle label="Gallery">
                            {this.renderCategory(
                              filters,
                              "partner_id",
                              galleryAggregation.counts
                            )}
                          </Toggle>

                          <Toggle label="Institution">
                            {this.renderCategory(
                              filters,
                              "partner_id",
                              institutionAggregation.counts
                            )}
                          </Toggle>
                          <Toggle label="Time period">
                            {this.renderCategory(
                              filters,
                              "major_periods",
                              periodAggregation.counts
                            )}
                          </Toggle>
                        </Sidebar>
                      )}
                      <Box width={xs ? "100%" : "70%"}>
                        <Separator mb={2} />
                        <Flex justifyContent="flex-end">
                          <Select
                            mt="-8px"
                            options={
                              [
                                { value: "-decayed_merch", text: "Default" },
                                {
                                  value: "-partner_updated_at",
                                  text: "Recently updated",
                                },
                                {
                                  value: "-published_at",
                                  text: "Recently added",
                                },
                                {
                                  value: "-year",
                                  text: "Artwork year (desc.)",
                                },
                                { value: "year", text: "Artwork year (asc.)" },
                              ] // Corrective spacing for line-height
                            }
                            selected={filters.state.sort}
                            onSelect={filters.setSort}
                          />
                        </Flex>

                        <Spacer mb={2} />

                        <ArtworkFilterRefetchContainer
                          artist={this.props.artist as any}
                          artistID={this.props.artist.id}
                          columnCount={xs || sm || md ? 2 : 3}
                          filters={filters.state}
                        />
                      </Box>
                    </Flex>
                  </React.Fragment>
                )
              }}
            </Responsive>
          )
        }}
      </Subscribe>
    )
  }
}

export const ArtworkFilterFragmentContainer = createFragmentContainer(
  (props: Props) => {
    return (
      <Subscribe to={[FilterState]}>
        {filters => {
          return <Filter {...props} filters={filters.state} />
        }}
      </Subscribe>
    )
  },
  graphql`
    fragment ArtworkFilter_artist on Artist
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        aggregations: {
          type: "[ArtworkAggregation]"
          defaultValue: [MEDIUM, TOTAL, GALLERY, INSTITUTION, MAJOR_PERIOD]
        }
      ) {
      id
      filtered_artworks(aggregations: $aggregations, size: 0) {
        aggregations {
          slice
          counts {
            name
            id
          }
        }
      }
      ...ArtworkFilterRefetch_artist
    }
  `
)

const Sidebar = Box
