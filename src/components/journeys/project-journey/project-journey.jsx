const React = require('react');
const {driver} = require('driver.js');
const DriverJourney = require('../driver-journey/driver-journey.jsx');
const {defineMessages, useIntl} = require('react-intl');
const {useState} = require('react');
const PropTypes = require('prop-types');
require('./project-journey.scss');

const messages = defineMessages({
    playProject: {
        id: 'project.journey.play',
        defaultMessage: 'Click green flag to play',
        description: 'Play project'
    },
    remixProject: {
        id: 'project.journey.remix',
        defaultMessage: 'Make your own version!',
        description: 'Remix project'
    }
});

const ProjectJourney = ({setCanViewProjectJourney}) => {
    const [driverObj] = useState(() => (
        driver()
    ));
    
    const intl = useIntl();

    const steps = [{
        element: 'div[class^="stage_green-flag-overlay-wrapper"] > div',
        popover: {
            callback: () => {
                const greenFlagButton = document.querySelector('div[class^="stage_green-flag-overlay-wrapper"] > div');
                greenFlagButton.addEventListener('click', () => {
                    setCanViewProjectJourney(false);
                    driverObj.destroy();
                });
            },
            description: intl.formatMessage(messages.playProject)
        }
    },
    {
        element: '.remix-button',
        popover: {
            callback: () => {
                const remixButton = document.querySelector('.remix-button');
                remixButton.addEventListener('click', () => {
                    setCanViewProjectJourney(false);
                    driverObj.destroy();
                });
            },
            description: intl.formatMessage(messages.remixProject)
        }
    }];

    return (
        <DriverJourney
            configProps={{
                popoverClass: 'project-journey',
                showButtons: [
                    'next',
                    'previous'
                ],
                onDestroyed: () => {
                    setCanViewProjectJourney(false);
                },
                nextBtnText: 'Next',
                prevBtnText: 'Previous',
                showProgress: false,
                steps: steps
            }}
            driverObj={driverObj}
        />
    );
};

ProjectJourney.propTypes = {
    setCanViewProjectJourney: PropTypes.func
};

module.exports = ProjectJourney;
