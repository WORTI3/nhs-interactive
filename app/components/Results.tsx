import { Button } from "nhsuk-react-components";
import { FC } from "react";
import { makeSourcesLinks } from "./defaults";
import { UNRELATED_ANSWER } from "../lib/utils/constants";
import { ResultProps } from "../lib/utils/interfaces";

export const Results: FC<ResultProps> = ({ searchQuery, answer, done, onReset }) => {
  return (
    <>
      <p className='text-md text-blue-500'>Question</p>
      <p className='italic'>{searchQuery.query} (?)</p>
      <hr className='nhsuk-section-break nhsuk-section-break--m nhsuk-section-break--visible' />
      <p className='text-blue-500 mb-2'>Answer</p>
      { answer === UNRELATED_ANSWER ? <>
        <p>It looks like your query may not be answerable.</p>
        <div className='nhsuk-details__text mb-6'>
          <p>This could be for several reasons:</p>
          <ul>
            <li>your query is not health related</li>
            <li>your query contained inappropriate language</li>
            <li>your query did not give enough detail</li>
          </ul>
        </div>
        </> : 
        <p className='overflow-auto'>
          {makeSourcesLinks(answer, searchQuery.sourceLinks)}
        </p>
      }
      
      {done && (
        <>
          <hr className='nhsuk-section-break nhsuk-section-break--m nhsuk-section-break--visible' />
          <p className='text-blue-500'>Sources</p>
          {searchQuery.sourceLinks.map((source, index) => (
            <div key={index} className='mt-1 overflow-auto'>
              {`[${index + 1}] `}
              <a
                className='hover:cursor-pointer hover:underline'
                target='_blank'
                rel='noopener noreferrer'
                href={source}
              >
                {source.split("//")[1].split("/")[0].replace("www.", "")}
              </a>
            </div>
          ))}
          <hr className='nhsuk-section-break nhsuk-section-break--m nhsuk-section-break--visible' />
        </>
      )}
      { (done || answer === UNRELATED_ANSWER) && (
        <Button onClick={onReset}>Ask New Question</Button>
      )}
    </>
  );
};
