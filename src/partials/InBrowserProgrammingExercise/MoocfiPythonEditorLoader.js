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
import CourseSettings from "../../../course-settings"

const ORGANIZATION = CourseSettings.tmcOrganization
const COURSE = CourseSettings.tmcCourse

const Wrapper = styled.div`
  padding 1rem;
`

class InBrowserProgrammingExercisePartial extends React.Component {
  static contextType = LoginStateContext

  state = {
    exerciseDetails: undefined,
    fetching: false,
    render: false,
  }

  async componentDidMount() {
    this.setState({ render: true })
    await this.fetch()
  }

  fetch = async () => {
    this.setState({ fetching: true })
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
      fetching: false,
    })
  }

  onUpdate = async completed => {
    this.setState({
      exerciseDetails: { completed },
    })
    await this.fetch()
  }

  render() {
    const { name, tmcname, children, height, outputheight } = this.props

    if (!this.state.render) {
      return <div>Loading</div>
    }

    const points = get(this.state, "exerciseDetails.available_points.length")
    const awardedPoints = get(
      this.state,
      "exerciseDetails.awarded_points.length",
    )
    const completed = get(this.state, "exerciseDetails.completed")

    return (
      <ProgrammingExerciseCard
        name={name}
        points={points}
        awardedPoints={awardedPoints}
        onRefresh={() => this.onUpdate(completed)}
        allowRefresh={this.context.loggedIn && !this.state.fetching}
        completed={completed}
      >
        <div>
          <Wrapper>{children}</Wrapper>
          <ProgrammingExercise
            onSubmissionResults={() => this.onUpdate(completed)}
            organization={ORGANIZATION}
            course={COURSE}
            exercise={tmcname}
            token={accessToken()}
            height={height ? height : "400px"}
            outputHeight={outputheight}
          />
        </div>
      </ProgrammingExerciseCard>
    )
  }
}

export default withTranslation("common")(
  withSimpleErrorBoundary(InBrowserProgrammingExercisePartial),
)
