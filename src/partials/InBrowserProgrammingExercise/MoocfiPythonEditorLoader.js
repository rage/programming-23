import React from "react"
import styled from "styled-components"
import { withTranslation } from "react-i18next"
import { get } from "lodash"

import { fetchProgrammingExerciseDetails } from "../../services/moocfi"
import LoginStateContext from "../../contexes/LoginStateContext"
import withSimpleErrorBoundary from "../../util/withSimpleErrorBoundary"
import { accessToken } from "../../services/moocfi"
import ProgrammingExerciseCard from "../ProgrammingExercise/ProgrammingExerciseCard"
import { ProgrammingExercise } from "moocfi-python-editor"
// import CourseSettings from "../../../course-settings"

// Hardcoded globals for now
const ORGANIZATION = "test" // CourseSettings.tmcOrganization
const COURSE = "python-test" // CourseSettings.tmcCourse

const Wrapper = styled.div`
  padding 1rem;
`

class InBrowserProgrammingExercisePartial extends React.Component {
  static contextType = LoginStateContext

  state = {
    exerciseDetails: undefined,
    render: false,
  }

  async componentDidMount() {
    this.setState({ render: true })
    // await this.fetch()
  }

  // Globals point to the wrong course for the purpose of testing this editor
  // So we can't fetch this data yet
  fetch = async () => {
    if (!this.props.tmcname) {
      return
    }
    let exerciseDetails = null
    try {
      exerciseDetails = await fetchProgrammingExerciseDetails(
        this.props.tmcname,
      )
    } catch (error) {
      console.error(error)
    }
    this.setState({
      exerciseDetails,
    })
  }

  onUpdate = async () => {
    this.setState({
      exerciseDetails: undefined,
    })
    // await this.fetch()
  }

  render() {
    const { name, tmcname, children } = this.props

    if (!this.state.render) {
      return <div>Loading</div>
    }

    const points = get(this.state, "exerciseDetails.available_points.length")
    const awardedPoints = get(
      this.state,
      "exerciseDetails.awarded_points.length",
    )

    console.log(this.state.exerciseDetails)

    return (
      <ProgrammingExerciseCard
        name={name}
        points={points}
        awardedPoints={awardedPoints}
        onRefresh={this.onUpdate}
        allowRefresh={this.context.loggedIn}
      >
        <div>
          <Wrapper>{children}</Wrapper>
          <ProgrammingExercise
            organization={ORGANIZATION}
            course={COURSE}
            exercise={tmcname}
            token={accessToken()}
          />
        </div>
      </ProgrammingExerciseCard>
    )
  }
}

export default withTranslation("common")(
  withSimpleErrorBoundary(InBrowserProgrammingExercisePartial),
)
