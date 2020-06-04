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
import { Typography } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"

const ORGANIZATION = CourseSettings.tmcOrganization
const COURSE = CourseSettings.tmcCourse

let language = "en"
if (CourseSettings.language === "fi") {
  language = "fi"
}

const Wrapper = styled.div`
  padding 1rem;
`

const StyledDeadlineText = styled(Typography)`
  padding: 0.25rem 0 1rem 0 !important;
  color: rgb(108, 117, 125) !important;
  font-size: 0.8rem !important;
  font-weight: bold !important;
`

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 0.9rem !important;
  margin-right: 0.25em !important;
  vertical-align: -0.1em !important;
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
    const {
      name,
      tmcname,
      children,
      height,
      outputheight,
      outputposition,
    } = this.props

    if (!this.state.render) {
      return <div>Loading</div>
    }

    const points = get(this.state, "exerciseDetails.available_points.length")
    const awardedPoints = get(
      this.state,
      "exerciseDetails.awarded_points.length",
    )
    const completed = get(this.state, "exerciseDetails.completed")
    const deadline =
      get(this.state, "exerciseDetails.deadline") !== null
        ? new Date(get(this.state, "exerciseDetails.deadline"))
        : null

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
          {deadline instanceof Date && !isNaN(deadline.getTime()) && (
            <StyledDeadlineText>
              <StyledIcon icon={faClock} />
              {`Deadline: ${deadline.toLocaleString("en-GB")}`}
            </StyledDeadlineText>
          )}
          <Wrapper>{children}</Wrapper>
          <ProgrammingExercise
            onSubmissionResults={() => this.onUpdate(completed)}
            organization={ORGANIZATION}
            course={COURSE}
            exercise={tmcname}
            token={accessToken()}
            height={height ? height : "300px"}
            outputHeight={outputheight ? outputheight : "auto"}
            outputPosition={outputposition || "relative"}
            language={language}
          />
        </div>
      </ProgrammingExerciseCard>
    )
  }
}

export default withTranslation("common")(
  withSimpleErrorBoundary(InBrowserProgrammingExercisePartial),
)
