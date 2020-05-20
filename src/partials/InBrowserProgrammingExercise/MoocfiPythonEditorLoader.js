import React from "react"
import styled from "styled-components"
import LoginStateContext from "../../contexes/LoginStateContext"
import { withTranslation } from "react-i18next"
import withSimpleErrorBoundary from "../../util/withSimpleErrorBoundary"
import { normalizeExerciseId } from "../../util/strings"
import { Paper } from "@material-ui/core"
import { accessToken } from "../../services/moocfi"
import { ProgrammingExercise } from "moocfi-python-editor"

const StyledPaper = styled(Paper)`
  margin: 2rem 0;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 1rem !important;
`

const Wrapper = styled.div`
  padding 1rem;
`

const Header = styled.h3`

`

class InBrowserProgrammingExercisePartial extends React.Component {
  static contextType = LoginStateContext

  render() {
    const { id, organization, course, exercise, title, children } = this.props

    return (
      <StyledPaper id={normalizeExerciseId(`quiz-${id}`)}>
        <Wrapper>
          <Header>
            {title}
          </Header>
          {children}
        </Wrapper>
        <ProgrammingExercise
          organization={organization}
          course={course}
          exercise={exercise}
          token={accessToken()} />
      </StyledPaper>
    )
  }
}

export default withTranslation("common")(
  withSimpleErrorBoundary(InBrowserProgrammingExercisePartial),
)
