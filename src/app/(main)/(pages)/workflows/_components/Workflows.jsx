import React from 'react'
import Workflow from './Workflow'

const Workflows = () => {
  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col m-2">
      <Workflow
        description="Creating a test Workflow" 
        id="jns2713bh421hb" 
        name="Automatic Workflow" 
        publish={false}
      />
        {/* <MoreCredits />
        {workflows?.length ? (
          workflows.map((flow) => (
            <Workflow
              key={flow.id}
              {...flow}
            />
          ))
        ) : (
          <div className="mt-28 flex text-muted-foreground items-center justify-center">
            No Workflows
          </div>
        )} */}
      </section>
    </div>
  )
}

export default Workflows